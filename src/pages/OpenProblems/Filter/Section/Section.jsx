import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import capitaliseFirstLetter from "../../../../utils/functions/stringManipulation/capitaliseFirstLetter";
import SideNavButton from "../Buttons/SideNavButton";
import apiAnnotations from "../../../../api/apiAnnotations";
import MenuList from "./MenuList";
import hierarchicalValidator from "../../../../utils/functions/validators/hierarchicalValidator";
import { buildHierarchicalTree } from "../../../../utils/functions/dataManipulation/buildTree";
import SelectedButton from "../Buttons/SelectedButton";
import { questionActions } from "../../../../state/Question/questionSlice";

function Section({ section, classNames }) {
  const title = capitaliseFirstLetter(section);
  const [sectionData, setSectionData] = useState(false);
  const [error, setError] = useState(false);
  const [isHierarchical, setIsHierarchical] = useState(false);
  const selectedItems = useSelector((state) => state.question.filters[section]);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    async function retrieve() {
      try {
        const { data } = await apiAnnotations.getAnnotationEntries({
          annotation: section,
        });
        const hierarchical = hierarchicalValidator(data);
        if (hierarchical) {
          setSectionData(buildHierarchicalTree(data));
          setIsHierarchical(true);
        } else {
          setSectionData(data);
          setIsHierarchical(false);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    retrieve();
    return () => controller.abort();
  }, [section]);

  const selectedButtonOnClick = (e) => {
    e.preventDefault();
    dispatch(
      questionActions.removeFilters({
        filter: section,
        id: e.currentTarget.value,
      }),
    );
  };

  if (error) {
    return (
      <div className="nav-section w-full">
        <SideNavButton classNames="disabled">
          Unable to load: {error}
        </SideNavButton>
      </div>
    );
  }

  return (
    <div className={classNames}>
      <Header title={title} />
      <SelectedItems items={selectedItems} onClick={selectedButtonOnClick} />
      <Menus
        isHierarchical={isHierarchical}
        data={sectionData}
        category={section}
      />
    </div>
  );
}

function Header({ title }) {
  return (
    <div className="flex flex-row justify-between text-base">
      <h1 className="">{title}</h1>
    </div>
  );
}

function SelectedItems({ items, onClick }) {
  return (
    <div className="selected">
      {items?.length > 0 && (
        <p className=" text-sm underline text-theme-blue"> Selected:</p>
      )}
      <ul className="text-sm text-theme-blue">
        {items?.map((item) => (
          <SelectedButton
            value={item.id}
            onClick={onClick}
            key={item.id}
            classNames="w-full hover:theme-blue text-left"
          >
            {item.title}
          </SelectedButton>
        ))}
      </ul>
    </div>
  );
}

function Menus({ isHierarchical, data, category }) {
  if (isHierarchical) {
    return (
      <div className="menus">
        {data.length > 0 ? (
          data.map((root) => (
            <MenuList
              key={root.title}
              items={root.children}
              category={category}
              title={root.title}
            />
          ))
        ) : (
          <p> Unable to load menu.</p>
        )}
      </div>
    );
  }
  return (
    <div className="menu">
      <MenuList
        title={capitaliseFirstLetter(category)}
        items={data}
        category={category}
      />
    </div>
  );
}

export default Section;
