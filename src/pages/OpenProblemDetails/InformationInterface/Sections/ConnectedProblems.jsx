import { HashLink } from "react-router-hash-link";
import InterfaceTemplate from "../../../../components/Template/InterfaceTemplate";

function ConnectedProblems(props) {
  const directChildren = props.children;
  const { parent } = props.parent;

  const parentId = parent ? parent.problem_id : null;
  const parentTitle = parent ? parent.title : null;
  return (
    <InterfaceTemplate title="Connected Problems">
      <div className="description pb-2 text-sm md:text-base">
        Each "Connected Problem" represents a focused inquiry, providing
        valuable insights and a comprehensive understanding of broader problems.
        Navigate freely to gain a deeper appreciation of complexities and engage
        with areas of interest.
      </div>
      <hr className="border-theme-blue" />
      <div className="connected-problems-list">
        <ul className="">
          {parent && (
            <HashLink
              smooth
              to={`../${parentId}#${parentId}`}
              className="pl-2 text-sm font-semibold hover:text-theme-blue hover:underline md:text-base"
            >
              <li className="parent" key={parentId}>
                {parentTitle && parentTitle}
              </li>
            </HashLink>
          )}
          {directChildren.map((child) => (
            <li key={child.problem_id}>
              <HashLink
                className=" pl-2 text-sm font-semibold hover:text-theme-blue hover:underline md:text-base"
                smooth
                to={`../${child.problem_id}#${child.problem_id}`}
              >
                <p>{child.title}</p>
              </HashLink>
            </li>
          ))}
        </ul>
      </div>
    </InterfaceTemplate>
  );
}

export default ConnectedProblems;
