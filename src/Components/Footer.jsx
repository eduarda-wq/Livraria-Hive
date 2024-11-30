
export function Footer() {
  return (
    <>
      <footer className="bg-[#FF8800] text-white bg-[url('./footerMobal.png')] sm:bg-[url('./footerDesc.png')] bg-cover ">

        <div className="grid grid-cols-1 gap-8 w-[17rem] p-9">

          <div className="">
            <img src="/Hive.png" alt="" className="w-[8rem] sm:w-[16.125rem]"  />
          </div>

          <div className=" grid gap-8">
            <div>
              <h3>Address:</h3>
              <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
            </div>

            <div>
              <h3>Contact:</h3>
              <p>1800 123 4567</p>
              <p>info@Hive.io</p>
            </div>
          </div>

          <div className="flex gap-3">
            <img src="face.png" alt="" />
            <img src="insta.png" alt="" />
            <img src="twt.png" alt="" />
          </div>

        </div>

        <div className="flex justify-center sm:flex-row">
          <hr className="w-[23rem] sm:w-[80rem] border-[1px]" />
        </div>


        <div className="text-center py-8 sm:flex sm:justify-between mx-9">
          <div>
            <p>© 2023 Hive. All rights reserved.</p>
          </div>

          <div className="flex justify-center gap-5">
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>

      </footer>


    </>
  )
}

