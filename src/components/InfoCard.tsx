import type { NextPage } from "next";
import { Card, Button } from "@nextui-org/react";

interface Props {
  title: string;
  label: string;
  imageURL: string;
  studentCount: string;
}

const InfoCard: NextPage<Props> = (props) => {
  const { title, label, imageURL, studentCount } = props;

  return (
    <Card style={{ position: "relative", overflow: "hidden" }}>
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 5,
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        <p style={{ fontSize: "12px", fontWeight: "bold", color: "#ffffffAA" }}>
          {label}
        </p>
        <h4 style={{ color: "white" }}>{title}</h4>
      </div>

      {/* Image */}
      <img
        src={imageURL}
        alt={`Image for ${title}`}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "200px",
        }}
      />

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          background: "rgba(15, 17, 20, 0.6)",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ color: "#d1d1d1", fontSize: "16px", margin: 0 }}>
          {studentCount} thành viên
        </p>
        <Button
          variant="flat"
          style={{
            borderRadius: "50px",
            color: "white",
            backgroundColor: "rgba(0, 123, 255, 0.8)",
          }}
        >
          Chọn vào nhóm
        </Button>
      </div>
    </Card>
  );
};

export default InfoCard;
