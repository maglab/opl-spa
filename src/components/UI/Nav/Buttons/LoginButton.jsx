import { Link } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Menu } from "@headlessui/react";
import withSVG from "../../../../utils/hoc/withSVG";
import MoreElipses from "../../Icons/MoreElipses";

const MoreIcon = withSVG(MoreElipses, { w: 1, h: 1 });

function LoginButton() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogout = (e) => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  if (isAuthenticated && accounts && accounts.length > 0) {
    // Ensure accounts array is not empty before trying to access properties
    return (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="text-sm flex flex-row p-2 bg-theme-blue rounded-sm text-white">
          <p> {accounts[0].name}</p>
          <MoreIcon />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    );
  }

  return (
    <button className="border border-theme-blue text-theme-blue text-sm p-2 rounded-sm hover:bg-opacity-90">
      {/* // <p onClick={handleLogout}> Logout</p> // Show "Logout" when authenticated */}
      <Link to="/login">Login / Register</Link>
    </button>
  );
}

export default LoginButton;
