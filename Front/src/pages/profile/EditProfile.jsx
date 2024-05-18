import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TextInput from "@/components/ui/TextInput";
import { editProfileShcema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import {
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} from "@/store/services/authApiSlice";

const EditProfile = ({ children }) => {
  // fetch current user
  const { data: user } = useGetCurrentUserQuery(null);

  // set up hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(editProfileShcema),
  });
  // Initialize form with user data
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.body.firstName || "",
        lastName: user.body.lastName || "",
      });
    }
  }, [user, reset]);

  // handle edit user
  const [open, setOpen] = useState(false);
  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();

  const onSubmit = async (data) => {
    try {
      await updateProfile(data).unwrap();
    } catch (err) {
      toast.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
      setOpen(false);
    }
  }, [isSuccess, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit name</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <TextInput
              register={register}
              error={errors.firstName}
              type="text"
              name="firstName"
              label="First name"
            />
            <TextInput
              register={register}
              error={errors.lastName}
              type="text"
              name="lastName"
              label="Last name"
            />
          </div>
          <DialogFooter className="mt-4">
            <button className="edit-button" disabled={isLoading}>
              {isLoading ? <PulseLoader color="#ffffff" /> : "Save changes"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditProfile.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EditProfile;
