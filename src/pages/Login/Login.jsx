import withSVG from "../../utils/hoc/withSVG";
import MSLogo from "../../assets/svg/ms-symbollockup_mssymbol_19.svg?react";
import { TextInputStyled } from "../../components/UI/Inputs/TextInput";
import { loginRequest } from "../../authConfig.js";
import { useMsal } from "@azure/msal-react";

//SVG to information
const defaultProps = {
  h: 4,
  w: 4,
};
const MicrosoftIcon = withSVG(MSLogo, defaultProps);
function Login() {
  //Need to redirect when user is already logged in
  const { instance } = useMsal();
  const handleLogin = async (e) => {
    try {
      const response = await instance.loginPopup(loginRequest);
      // User is logged in
      // Redirect to the desired page
      window.location.assign("http://localhost:3000/open-problems");
    } catch (error) {
      console.error(error); // Log any errors that occur
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 h-screen">
      <div className="w-1/4 bg-white border rounded shadow-md p-6 align-middle">
        <h1 className="text-xl font-semibold mb-4 w-full text-center">
          Log in
        </h1>
        <div className="login-options p-2 flex flex-col justify-center items-center">
          <button
            onClick={handleLogin}
            className="flex flex-row p-3 gap-x-2 border border-[#8c8c8c] items-center justify-center"
          >
            <MicrosoftIcon />
            <p> Log in with Microsoft </p>
          </button>
        </div>

        <div className="alternate login p-2 mt-4">
          <hr className="border-theme-blue py-2" />
          <form className=" flex justify-center flex-col">
            <p className="text-center py-2 mb-2"> Alternatively:</p>
            <div className="inputs px-2 mb-2">
              <TextInputStyled label="Username" />
              <TextInputStyled label="Password" type="password" />
            </div>
            <div className="buttons justify-center items-center flex">
              <button className="bg-theme-blue text-white p-2 mt-2 rounded-sm">
                <span>Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
