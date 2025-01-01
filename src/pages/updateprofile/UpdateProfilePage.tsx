import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.scss"

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
    name: '',
    email: '',
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
    axios
      .get('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        }
      })
      .catch((error) => console.error('Error fetching provinces:', error));
  }, []);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    setUserData((prev) => ({ ...prev, province: provinceId, district: '', ward: '' }));
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
        .catch((error) => console.error('Error fetching districts:', error));
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setUserData((prev) => ({ ...prev, district: districtId, ward: '' }));
    setWards([]);

    if (districtId) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setWards(response.data.data);
          }
        })
        .catch((error) => console.error('Error fetching wards:', error));
    }
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wardId = e.target.value;
    setUserData((prev) => ({ ...prev, ward: wardId }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put('http://localhost:9999/users', userData)
      .then(() => alert('Cập nhật thành công!'))
      .catch(() => alert('Có lỗi xảy ra khi cập nhật thông tin.'));
  };

  return (
    <div className="update-profile">
      <h2>Cập nhật thông tin</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Họ và tên:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
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
