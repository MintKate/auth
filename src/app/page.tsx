"use client";

import React, { useState, useEffect } from "react";
import InfoCard from "../components/InfoCard";
import { SessionProvider, useSession } from "next-auth/react";
import UserButton from "@/components/user-button"; // Import UserButton
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

const HomeComponent: React.FC = () => {
  const [session, setSession] = useState<any>(null); // Lưu session trong state
  const { data: sessionData } = useSession(); // Dữ liệu session từ next-auth
  const [showAlert, setShowAlert] = useState(false); // Trạng thái để hiển thị thông báo
  const [message, setMessage] = useState<string | null>(null); // Lưu thông báo kết quả
  const [similarityScores, setSimilarityScores] = useState<SimilarityScores>({});


  // Cập nhật session khi có sự thay đổi
  // useEffect(() => {
  //   setSession(sessionData);
  // }, [sessionData]);
  interface SimilarityScores {
    [key: string]: {
      similarity_score: number;
    };
  }

  useEffect(() => {
    const storedScores = localStorage.getItem("similarityScores");
    if (storedScores) {
      setSimilarityScores(JSON.parse(storedScores));
    } else {
      console.log("No similarity scores found.");
    }
  }, []);

  const topicMap = {
    group_1: "Hệ thống kinh doanh nông nghiệp",
    group_2: "Hệ thống quản lý tài chính cho cá nhân",
    group_3: "Hệ thống tìm kiếm mặt bằng cho thuê",
    group_4: "Hệ thống đào tạo thông minh cho sinh viên",
  };
  
  const imageMap = {
    group_1: "https://littlevisuals.co/images/red_dawn.jpg",
    group_2: "https://littlevisuals.co/images/sunset.jpg",
    group_3: "https://littlevisuals.co/images/tail.jpg",
    group_4: "https://littlevisuals.co/images/steam.jpg",
  };
  
  const scoresArray = similarityScores
  ? Object.keys(similarityScores).map((groupKey) => ({
      group: groupKey as keyof typeof topicMap,
      similarity_score: similarityScores[groupKey]?.similarity_score || 0,
    }))
  : [];
  

  
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleJoinGroup = async (topicName: string, compatibility: string) => {
    setPending(true);

    if (!session) {
        setShowAlert(true);
        return;
    }

    if (!session?.user?.email || !session?.user?.name) {
        setMessage("Session is invalid. Please log in again.");
        return;
    }

    try {
        const response = await fetch("/api/saveGroup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: session.user.name, // Lấy tên từ session
                topicName,
                compatibility,
                userEmail: session.user.email,
            }),
        });

        if (response.ok) {
            setPending(false);
            const data = await response.json();
            setMessage(data.message);
            router.push("/group-details");
        } else {
            const errorData = await response.json();
            setMessage(errorData.message);
        }
    } catch (error) {
        console.error("Error joining group:", error);
        setMessage("An error occurred while saving the group selection.");
    }
  };



  return (
    <div className="container mx-auto px-4">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-6 bg-white">
        <div className="text-lg font-bold">Chọn nhóm theo topic</div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Learning Platform
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Community
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact Us
          </a>
        </div>
        <div>
          {/* Pass session handler to UserButton */}
          <UserButton
            onSessionChange={(newSession) => setSession(newSession)} // Cập nhật session khi có sự thay đổi
          />
        </div>
      </nav>

      {/* Jumbotron */}
      <div
        className="flex justify-center items-center h-96 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://littlevisuals.co/images/sunset.jpg)",
        }}
      >
        <div className="text-center">
          <h1 className="text-white text-4xl sm:text-5xl font-bold">
            Hãy chọn topic
          </h1>
          <h1 className="text-white text-4xl sm:text-5xl font-bold">
            phù hợp nhất với bạn!
          </h1>
        </div>
      </div>

      {/* Displaying Product Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <InfoCard
          topicName="Hệ thống kinh doanh nông nghiệp"
          compatibility={session ? `${similarityScores?.["Topic A"] || "50%"}` : ""}
          imageURL="https://littlevisuals.co/images/red_dawn.jpg"
          studentCount="4"
          onClick={() => handleJoinGroup("Topic A", similarityScores?.["Topic A"] || "50%")}
        />
        <InfoCard
          topicName="Hệ thống quản lý tài chính cho cá nhân"
          compatibility={session ? `${similarityScores?.["Topic B"] || "60%"}` : ""}
          imageURL="https://littlevisuals.co/images/sunset.jpg"
          studentCount="3"
          onClick={() => handleJoinGroup("Topic B", similarityScores?.["Topic B"] || "60%")}
        />
        <InfoCard
          topicName="Hệ thống tìm kiếm mặt bằng cho thuê"
          compatibility={session ? `${similarityScores?.["Topic C"] || "10%"}` : ""}
          imageURL="https://littlevisuals.co/images/tail.jpg"
          studentCount="5"
          onClick={() => handleJoinGroup("Topic C", similarityScores?.["Topic C"] || "10%")}
        />
        <InfoCard
          topicName="Hệ thống đào tạo thông minh cho sinh viên"
          compatibility={session ? `${similarityScores?.["Topic D"] || "90%"}` : ""}
          imageURL="https://littlevisuals.co/images/steam.jpg"
          studentCount="5"
          onClick={() => handleJoinGroup("Topic D", similarityScores?.["Topic D"] || "90%")}
        />
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {scoresArray.map(({ group, similarity_score }) => (
          <InfoCard
            key={group}
            topicName={topicMap[group]}
            compatibility={`${similarity_score.toFixed(2)}%`}
            imageURL={imageMap[group]}
            studentCount="4"
            onClick={() => handleJoinGroup(topicMap[group], similarity_score.toFixed(2))}
          />
        ))}
      </div>

      {/* Hiển thị thông báo yêu cầu đăng nhập nếu chưa đăng nhập */}
      {showAlert && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md">
          Chức năng này cần phải đăng nhập!
        </div>
      )}

      {/* Hiển thị thông báo kết quả khi lưu nhóm */}
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md">
          {message}
        </div>
      )}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <SessionProvider>
      <HomeComponent />
    </SessionProvider>
  );
};

export default Home;

