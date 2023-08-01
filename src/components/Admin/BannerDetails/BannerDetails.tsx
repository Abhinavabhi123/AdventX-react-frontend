import React, { useEffect, useState } from "react";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function BannerDetails() {
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState([
    {
      _id: "",
      image: "",
      title: "",
      subTitle: "",
      status: false,
    },
  ]);
  const [deleted, setDeleted] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      await AdminAxios.get("banners").then((response) => {
        console.log(response);
        if (response?.data?.status === 200) {
          setBannerData(response?.data?.bannerData);
        }
      });
    })();
  }, [deleted]);

  const deleteBanner = async (id: string) => {
    try {
      console.log("deleting");
      Swal.fire({
        title: "Are you sure?",
        text: "You won't to delete this community",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await AdminAxios.delete("deleteBanner", { params: { id } })
            .then((response) => {
              console.log(response);
              if (response?.data?.status === 200) {
                deleted ? setDeleted(false) : setDeleted(true);
                Swal.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                ).then((result) => {
                  console.log(result, "result");
                  deleted ? setDeleted(false) : setDeleted(true);
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (
          result.isDismissed &&
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire("Cancelled", "Your file is safe :)", "error");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="w-[70rem] h-[47rem] bg-white rounded-lg"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <table className=" w-full">
        <thead className="w-full bg-gray-400 rounded-lg">
          <tr className="w-full">
            <th className="w-14 text-center">Si.No</th>
            <th className="w-36  text-center">Image</th>
            <th className=" text-center">Title</th>
            <th className=" text-center">Sub title</th>
            <th className=" text-center">Status</th>
            <th className=" text-center w-16">Action</th>
          </tr>
        </thead>
        <tbody>
          {bannerData.map((banner, i) => {
            return (
              <tr key={i} className="w-full  h-14 border-b border-black">
                <td className="text-center">{i + 1}</td>
                <td className="text-center h-[3rem] flex justify-center items-center">
                  <img
                    className="w-16"
                    src={`${import.meta.env.VITE_BANNER_API}${banner?.image}`}
                    alt="banner image"
                  />
                </td>
                <td className="text-center">{banner?.title}</td>
                <td className="text-center">{banner?.subTitle}</td>
                <td className="text-center">
                  {banner?.status === true ? "true" : "false"}
                </td>
                <td className="text-center flex justify-center items-center">
                  <div className="w-14 flex justify-between">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/bannerManagement/editBanner/${banner?._id}`
                        )
                      }
                    >
                      <img className="w-5" src="/icons/edit.1.png" alt="edit" />
                    </button>
                    <button onClick={() => deleteBanner(banner?._id)}>
                      <img className="w-5" src="/icons/delete1.png" alt="" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BannerDetails;
