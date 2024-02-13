import { Combobox, Transition } from "@headlessui/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";

import UpDownIcon from "../../../../components/UI/Icons/UpDown";
import extractAnnotationInformation from "../../../../utils/functions/extractAnnotationInformation";
import { questionActions } from "../../../../state/Question/questionSlice";
import CheckSvg from "../../../../components/UI/Icons/Check";
import withSVG from "../../../../utils/hoc/withSVG";
import useClickedOutside from "../../../../utils/hooks/useClickedOutside";

const defaultParams = {
  w: 4,
  h: 4,
};
const CheckIcon = withSVG(CheckSvg, defaultParams);

function MenuList({ items, category, title }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fuseInstance, setFuseInstance] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [query, setQuery] = useState("");
  const selectedItems = useSelector(
    (state) => state.question.filters[category],
  );
  const dispatch = useDispatch();

  // Handling outside click events for the menu list
  const wrapperRef = useRef(null); // The ref to track outside click events
  const outsideClickHandler = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };
  useClickedOutside(wrapperRef, outsideClickHandler);

  const toggleMenu = useCallback((e) => {
    e.preventDefault();
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }, []);

  const onChangeHandler = useCallback(
    (e) => {
      const inputValue = e.target.value.trim().toLowerCase();
      setQuery(inputValue);

      if (inputValue === "") {
        setMenuOpen(false);
        resetFilter();
      } else {
        setMenuOpen(true);
        filterItems(inputValue);
      }
    },
    [fuseInstance],
  );

  const onClickHandler = () => {
    // Handler to set the filter state to on when a filter is clicked;
    dispatch(questionActions.setState({ key: "filterOpen", value: true }));
  };

  const resetFilter = () => {
    setFilteredItems(
      items.map((item) => extractAnnotationInformation(item, category)),
    );
  };

  const filterItems = (searchValue) => {
    if (fuseInstance) {
      const results = fuseInstance
        .search(searchValue)
        .map((result) => result.item);
      setFilteredItems(results);
    }
  };

  useEffect(() => {
    if (items.length) {
      const list = items.map((item) =>
        extractAnnotationInformation(item, category),
      );
      const fuse = new Fuse(list, {
        keys: ["title"],
        threshold: 0.3,
      });
      setFilteredItems(list);
      setFuseInstance(fuse);
    }
  }, [items, category]);

  return (
    <div className="w-full text-sm" key={title}>
      <Combobox
        value={selectedItems}
        onChange={(items) =>
          dispatch(
            questionActions.updateFilters({ filter: category, value: items }),
          )
        }
        multiple
      >
        <div className="py-2 font-semibold">
          <Combobox.Label>Search by {title}:</Combobox.Label>
        </div>
        <div className="flex w-full items-center ring-0 focus:outline-none py-2">
          <Combobox.Input
            onChange={onChangeHandler}
            className="w-full rounded-md focus:outline-none p-0.5 px-2 shadow-lg border border-theme-blue"
          />
          <button className="ml-2 focus:outline-none" onClick={toggleMenu}>
            <UpDownIcon />
          </button>
        </div>
        <Transition
          show={menuOpen}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {filteredItems.length === 0 && query ? (
            <div className="py-2">
              <p>Cannot find results for "{query}"</p>
            </div>
          ) : (
            <div className="gap-y-2" ref={wrapperRef}>
              <Combobox.Options
                onClick={onClickHandler}
                className="absolute bg-white py-2 border shadow-lg"
              >
                {filteredItems.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className=" p-2 overflow-auto hover:cursor-pointer hover:bg-gray-200 bg-opacity-70 text-xs text-theme-blue flex flex-row justify-between"
                    value={item}
                  >
                    {item.title}
                    {selectedItems.includes(item) && <CheckIcon />}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          )}
        </Transition>
      </Combobox>
    </div>
  );
}

export default MenuList;
