import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";

interface Province {
  id: string;
  full_name: string;
}

interface District {
  id: string;
  full_name: string;
}

interface Ward {
  id: string;
  full_name: string;
}

const UpdateProfilePage = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    gender: '', 
    dob: '',    
    address: '', 
    province: '', 
    district: '', 
    ward: '',   
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    console.log("UserId from sessionStorage:", userId);
  
    if (userId) {
      axios.get(`http://localhost:9999/users?userId=${userId}`)
        .then((response) => {
          console.log("Received user data:", response.data); 
          if (response.data && response.data.length > 0) {
            const user = response.data[0];  
            setUserData({
              fullName: user.fullName || '',
              phone: user.phone || '',
              email: user.email || '',
              password: user.password || '',
              gender: user.gender || '', 
              dob: user.dob || '',    
              address: user.address || '', 
              province: user.province || '', 
              district: user.district || '', 
              ward: user.ward || '',
            });
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    } else {
      console.error("UserId not found in sessionStorage!");
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    setUserData((prev) => ({
      ...prev,
      province: provinceId,
      district: "",
      ward: "",
    }));
    setDistricts([]); 
    setWards([]); 

    if (provinceId) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setDistricts(response.data.data);
          }
        })
        .catch((error) => console.error("Error fetching districts:", error));
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setUserData((prev) => ({ ...prev, district: districtId, ward: "" }));
    setWards([]); 

    if (districtId) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setWards(response.data.data);
          }
        })
        .catch((error) => console.error("Error fetching wards:", error));
    }
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wardId = e.target.value;
    setUserData((prev) => ({ ...prev, ward: wardId }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("Không tìm thấy thông tin tài khoản. Vui lòng đăng nhập lại.");
      return;
    }
  
    try {
      const allUsers = await axios.get("http://localhost:9999/users");
      const user = allUsers.data.find((u: { userId: number }) => u.userId === Number(userId));
  
      if (user) {
        const updatedUserData = {
          ...userData,
          userId: user.userId,
        };
  
        await axios.put(`http://localhost:9999/users/${user.id}`, updatedUserData);
        alert("Cập nhật thành công!");
  
        const updatedUser = await axios.get(`http://localhost:9999/users/${user.id}`);
        const { province, district } = updatedUser.data;
  
        if (province) {
          const districtResponse = await axios.get(`https://esgoo.net/api-tinhthanh/2/${province}.htm`);
          if (districtResponse.data.error === 0) {
            setDistricts(districtResponse.data.data);
          }
  
          if (district) {
            const wardResponse = await axios.get(`https://esgoo.net/api-tinhthanh/3/${district}.htm`);
            if (wardResponse.data.error === 0) {
              setWards(wardResponse.data.data);
            }
          }
        }
  
        setUserData(updatedUser.data);
      } else {
        alert("Không tìm thấy người dùng.");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật thông tin.");
      console.error("Error:", error);
    }
  };
  
  return (
    <div className="update-profile">
      <h2>Cập nhật thông tin</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Họ và tên:
          <input
            type="text"
            name="fullName" 
            value={userData.fullName || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Mật Khẩu:
          <input
            type="text"
            name="password"
            value={userData.password || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Giới tính:
          <select
            name="gender"
            value={userData.gender}
            onChange={handleInputChange}
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </label>
        <label>
          Ngày sinh:
          <input
            type="date"
            name="dob"
            value={userData.dob}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Tỉnh/Thành phố:
          <select
            name="province"
            value={userData.province}
            onChange={handleProvinceChange}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.full_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quận/Huyện:
          <select
            name="district"
            value={userData.district}
            onChange={handleDistrictChange}
            disabled={!userData.province}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.full_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Phường/Xã:
          <select
            name="ward"
            value={userData.ward}
            onChange={handleWardChange}
            disabled={!userData.district}
          >
            <option value="">Chọn phường/xã</option>
            {wards.map((ward) => (
              <option key={ward.id} value={ward.id}>
                {ward.full_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Địa chỉ cụ thể:
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
