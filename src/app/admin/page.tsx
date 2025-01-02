"use client"
import useInsertCountryModal from "../../../hooks/useInsertCountryModal";

const CountryDashboard = () => {
    const insertCountryModal = useInsertCountryModal();
    return ( 
        <div className="flex flex-col min-h-screen">
            <div className="bg-light-purple-admin p-8 flex justify-between items-center">
                <h1 className="text-purple text-2xl font-bold ml-10">QUỐC GIA</h1>
                <div className="flex items-center space-x-4">
                    <input
                    type="text"
                    placeholder="Search"
                    className="border w-full sm:w-[200px] md:w-[300px] lg:w-[400px] max-w-full rounded-full px-4 py-2"
                    />
                    <button onClick={insertCountryModal.onOpen} className="bg-blue-500 w-[120px] text-white px-4 py-2 rounded-md">
                    + Thêm
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 grow">
                Table
            {/* <table className="min-w-full">
                <thead>
                <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QUỐC GIA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NGÔN NGỮ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QUỐC KỲ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TÙY CHỈNH
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">001</td>
                    <td className="px-6 py-4 whitespace-nowrap">Việt Nam</td>
                    <td className="px-6 py-4 whitespace-nowrap">Tiếng Việt</td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-500 mr-4">Chỉnh sửa</button>
                    <button className="text-red-500">Xóa</button>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">002</td>
                    <td className="px-6 py-4 whitespace-nowrap">Úc</td>
                    <td className="px-6 py-4 whitespace-nowrap">Tiếng Anh</td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-500 mr-4">Chỉnh sửa</button>
                    <button className="text-red-500">Xóa</button>
                    </td>
                </tr>
                </tbody>
            </table> */}
            </div>        
        </div>        
    );
}
 
export default CountryDashboard;