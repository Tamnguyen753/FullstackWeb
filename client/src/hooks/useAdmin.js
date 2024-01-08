import { toast } from "react-toastify";
import { request } from "../utils/axios-http";
import { extractMessageFromErr } from "../utils/error";

const useAdmin = () => {
  const createMovie = async (data) => {
    try {
      const {
        name,
        image,
        director,
        actor,
        tag,
        duration,
        launch,
        language,
        rating,
        trailer,
        des,
      } = data;
      const res = await request({
        data: {
          name,
          image,
          director,
          actor,
          tag,
          duration,
          launch,
          language,
          rating,
          trailer,
          des,
        },
        method: "post",
        url: "/movie",
      });
      console.log(data);

      toast.success("Create success");
    } catch (err) {
      toast.error(extractMessageFromErr(err));
    }
  };
  return { createMovie };
};

export default useAdmin;
