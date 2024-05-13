// import React from 'react'
import CustomInput from "../component/CustomInput"
import Dropzone from "react-dropzone"
const AddProductCat = () => {
  return (
    <div>
    <h3 className="mb-4  title">
      {/* {getPCatId !== undefined ? "Edit" : "Add"}  */}
      Category
    </h3>
    <div>
      <form action="" 
      // onSubmit={formik.handleSubmit}
      >
        <CustomInput
          type="text"
          label="Enter Product Category"
          // onChng={formik.handleChange("title")}
          // onBlr={formik.handleBlur("title")}
          // val={formik.values.title}
          id="brand"
        />
        <div className="error">
          {/* {formik.touched.title && formik.errors.title} */}
        </div>
        <div className="bg-white border-1 p-5 text-center mt-3">
          <Dropzone
            // onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>
                    Drag n drop some files here, or click to select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="showimages d-flex flex-wrap mt-3 gap-3">
          {/* {imgState?.map((i, j) => {
            return (
              <div className=" position-relative" key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(delImg(i.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img src={i.url} alt="" width={200} height={200} />
              </div>
            );
          })} */}
        </div>
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {/* {getPCatId !== undefined ? "Edit" : "Add"}  */}
          Category
        </button>
      </form>
    </div>
  </div>
  )
}

export default AddProductCat