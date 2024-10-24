import { handleGithubLogin, login } from "@/lib/action";
import { signIn, auth } from "@/lib/auth";


const LoginPage = async () => {

    return (
        <div>
            <form action={handleGithubLogin}>
                <button>Login with Github</button>
            </form>

            <form action={login}>
                <input type="text" placeholder="username" name="username"/>
                <input type="password" placeholder="password" name="password"/>
                <button>Login with credentials</button>
            </form>
        </div>
    )
}

export default LoginPage