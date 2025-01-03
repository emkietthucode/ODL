const NavBar = () => {
  return (
    <div className="flex justify-around items-center p-4">
      <div className="text-gray-500">Logo</div>
      <div className="flex gap-10">
        <nav className="flex justify-center items-center gap-6 text-gray-500">
          <a href="#" className="hover:text-purple">
            Trang chủ
          </a>
          <a href="#" className="hover:text-purple">
            Thi thử
          </a>
          <a href="#" className="hover:text-purple">
            Luyện thi
          </a>
          <a href="#" className="hover:text-purple">
            Liên hệ
          </a>
        </nav>
        <nav className="flex gap-3 items-center">
          <a href="#" className="text-purple font-bold underline">
            ĐĂNG KÝ
          </a>
          <a
            href="#"
            className="bg-purple font-bold text-white px-4 py-2 rounded-full"
          >
            ĐĂNG NHẬP
          </a>
        </nav>
      </div>
    </div>
  )
}

export default NavBar
