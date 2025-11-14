export default function Monster({ color, height = "h-24" }) {
    return (
    <div
        className={`${color} ${height} relative rounded-t-full rounded-b-md flex justify-center items-start pt-2 mb-4`}
        style={{ width: "5rem" }}
    >
        {/* Eyes */}
        <div className="flex space-x-1 mt-2">
        <div className="relative w-5 h-5 bg-white rounded-full">
            <div className="absolute w-2 h-2 bg-black rounded-full top-[6px] left-[6px]" />
        </div>
        <div className="relative w-5 h-5 bg-white rounded-full">
            <div className="absolute w-2 h-2 bg-black rounded-full top-[6px] left-[6px]" />
        </div>
        </div>
    </div>
    );
}