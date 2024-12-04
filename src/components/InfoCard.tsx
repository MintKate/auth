// //src\components\InfoCard

interface Props {
  topicName: string;
  compatibility: string;
  imageURL: string;
  studentCount: string;
  onClick: () => void; // Thêm prop onClick
}

const InfoCard: React.FC<Props> = ({ topicName, compatibility, imageURL, studentCount, onClick }) => {
  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
      {/* Header */}
      <div className="absolute top-2 left-2 right-2 z-10 bg-black bg-opacity-60 text-white p-2 rounded-md">
        <h4 className="text-sm font-bold">{topicName}</h4>
        <div className="h-4"></div>
        <p className="h-6 font-semibold text-center text-xl">{compatibility}</p>
      </div>

      {/* Image */}
      <img
        src={imageURL}
        alt={`Image for ${topicName}`}
        className="object-cover w-full h-48"
      />

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white flex items-center justify-between p-4">
        <p className="text-sm">{studentCount} thành viên</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          onClick={onClick} // Gọi hàm onClick từ prop
        >
          Chọn vào nhóm
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
