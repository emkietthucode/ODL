const Home = () => {
   return (
    <main className="flex-grow flex flex-col justify-evenly text-left m-10 p-10 bg-white">
      <h1 className="text-3xl font-bold text-purple">
        ODL - Chinh phục tay lái, vượt mọi giới hạn!
      </h1>
      <p className="text-gray-700 mb-8 max-w-xl">
        ODL mang đến giải pháp ôn thi bằng lái xe nhanh chóng và tiện lợi, giúp bạn học mọi lúc, mọi nơi. Hệ thống bài thi sát thực tế và hỗ trợ đa quốc gia, ODL đồng hành cùng bạn trên hành trình chinh phục kỳ thi lái xe dễ dàng nhất.
      </p>
      <button className="bg-purple font-bold text-2xl text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-600 w-fit">
        Luyện thi ngay
      </button>
      <div className="mt-12">
        <img src="car-illustration.png" alt="Driving School" className="w-full max-w-md" />
      </div>
    </main>     
      
  );
};

export default Home;