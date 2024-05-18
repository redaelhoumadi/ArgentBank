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
import { editTransactionShcema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const EditTransactions = ({ children }) => {
  // set up hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editTransactionShcema),
  });
  // handle submit form
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <TextInput
              register={register}
              error={errors.transactionType}
              type="text"
              name="transactionType"
              label="Transaction type"
            />
            <TextInput
              register={register}
              error={errors.category}
              type="text"
              name="category"
              label="Category"
            />
            <TextInput
              register={register}
              error={errors.notes}
              type="text"
              name="notes"
              label="Notes"
            />
          </div>
          <DialogFooter className="mt-4">
            <button className="edit-button">Save changes</button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditTransactions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EditTransactions;
