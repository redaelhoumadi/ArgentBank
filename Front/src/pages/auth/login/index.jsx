import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TextInput from "@/components/ui/TextInput";
import { signInShcema } from "@/lib/validation";
import { useLoginMutation } from "@/store/services/authApiSlice";
import { setCredentials } from "@/store/features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // set up hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signInShcema),
  });

  // handle login form
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ access_token: res.body.token }));
    } catch (err) {
      toast.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <div className="sign-in-head">
          <FaUserCircle className="user-icon" />
          <h1>Sign In</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 space-y-3">
            <TextInput
              register={register}
              error={errors.email}
              type="text"
              name="email"
              label="Email"
            />
            <TextInput
              register={register}
              error={errors.password}
              type="password"
              name="password"
              label="Password"
            />
          </div>
          <button className="sign-in-button" disabled={isLoading}>
            {isLoading ? <PulseLoader color="#ffffff" /> : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Index;
