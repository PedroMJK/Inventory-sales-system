export default function Dashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">
                Dashboard
            </h2>

            <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Total Products</p>
                    <h3 className="text-3xl font-semibold">120</h3>
                </div>
                
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Total Sales</p>
                    <h3 className="text-3xl font-semibold">87</h3>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Low Stock</p>
                    <h3 className="text-3xl font-semibold">5</h3>
                </div>

            </div>
    
        </div>
    )
}