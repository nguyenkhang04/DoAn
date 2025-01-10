import React, { useState, useEffect, ChangeEvent } from "react";
import { Rate, Progress } from "antd";
import "./styles.scss";

interface Review {
  user: string;
  content: string;
  date: string;
  rating: number;
}

const ProductReview: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(0);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedReviews = localStorage.getItem("reviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const saveReviews = (updatedReviews: Review[]): void => {
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  const handleReviewChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setNewReview(event.target.value);
  };

  const handleAddReview = (): void => {
    if (!user) {
      setError("Bạn phải đăng nhập để thêm đánh giá.");
      return;
    }

    if (!newReview.trim()) {
      setError("Nội dung đánh giá không thể để trống.");
      return;
    }
    if (newRating === 0) {
      setError("Vui lòng chọn số sao để đánh giá.");
      return;
    }

    const review: Review = {
      user: user.fullName,
      content: newReview,
      date: new Date().toLocaleString(),
      rating: newRating,
    };

    const updatedReviews = [...reviews, review];
    saveReviews(updatedReviews);
    setNewReview("");
    setError("");
    setNewRating(0);
  };

  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length ||
    0
  ).toFixed(1);

  const starDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => review.rating === star).length,
  }));

  return (
    <div className="product-review-container">
      <h3 className="title">Bình Luận và Đánh Giá</h3>

      <div className="review-summary">
        <div className="average-rating">
          <h1>{averageRating}/5</h1>
          <Rate disabled value={parseFloat(averageRating)} />
          <p>{reviews.length} đánh giá và nhận xét</p>
        </div>
        <div className="rating-distribution">
          {starDistribution.map((item) => (
            <div className="rating-row" key={item.star}>
              <span>{item.star} Sao</span>
              <Progress
                percent={(item.count / reviews.length) * 100 || 0}
                showInfo={false}
                strokeColor="#f5222d"
              />
              <span>{item.count} đánh giá</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <strong>{review.user}</strong>
                <span>{review.date}</span>
              </div>
              <Rate disabled value={review.rating} />
              <p className="review-content">{review.content}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews">
            Chưa có đánh giá nào. Hãy là người đầu tiên thêm đánh giá!
          </p>
        )}
      </div>

      <div className="add-review-form">
        <h4>Đánh giá của bạn</h4>
        {user ? (
          <div>
            <div className="rate-container">
              <Rate onChange={setNewRating} value={newRating} />
            </div>
            <textarea
              className="form-control"
              placeholder="Viết đánh giá của bạn..."
              value={newReview}
              onChange={handleReviewChange}
            />
            <button className="btn-primary" onClick={handleAddReview}>
              Gửi đánh giá
            </button>
          </div>
        ) : (
          <p className="login-warning">Bạn cần đăng nhập để thêm đánh giá.</p>
        )}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default ProductReview; 