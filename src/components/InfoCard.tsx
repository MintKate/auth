import React from "react";

interface Props {
  title: string;
  compatibility: string;
  imageURL: string;
  studentCount: string;
}

const InfoCard: React.FC<Props> = ({ title, compatibility, imageURL, studentCount }) => {
  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
      {/* Header */}
      <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-60 text-white p-2 rounded-md">
        <h4 className="text-sm font-bold">{title}</h4>
        <p className="text-xs font-semibold">{compatibility}</p>
      </div>

      {/* Image */}
      <img
        src={imageURL}
        alt={`Image for ${title}`}
        className="object-cover w-full h-48"
      />

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white flex items-center justify-between p-4">
        <p className="text-sm">{studentCount} thành viên</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          Chọn vào nhóm
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
