import ItemComponent from "../List/ItemComponent/ItemComponent";
import ButtonGroupComponent from "../ButtonGroup/ButtonGroupComponent";
function ListAccordionContent({ openProblem }) {
  const children = openProblem.children;
  const parent = openProblem.parent_problem;
  const isRoot = parent ? true : false;

  return (
    <>
      <div className="description py-4">
        <p className="text-sm ">
          {openProblem.description && openProblem.description}
        </p>
      </div>
      <div className="buttons flex justify-center">
        <ButtonGroupComponent openProblem={openProblem} isRoot={isRoot} />
      </div>
      <div className="problems">
        <h1 className="text-lg underline">Connected Open Problems</h1>
        {children.length > 0 ? (
          <li>
            {children.map((item, index) => (
              <ItemComponent key={index} openProblem={item} />
            ))}
          </li>
        ) : (
          <p>None</p>
        )}
      </div>
    </>
  );
}

export default ListAccordionContent;
