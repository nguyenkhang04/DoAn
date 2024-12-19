import React, { useState, useEffect, ChangeEvent } from "react";
import "./styles.scss";

interface Review {
  user: string;
  content: string;
  date: string;
}

const ProductReview: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string>("");

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

  const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
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

    const review: Review = {
      user: user.fullName,
      content: newReview,
      date: new Date().toLocaleString(),
    };

    const updatedReviews = [...reviews, review];
    saveReviews(updatedReviews);
    setNewReview("");
    setError("");
  };

  return (
    <div className="product-review-container">
      <h3 className="title">Đánh Giá Sản Phẩm</h3>

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.slice(0, 4).map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <strong>{review.user}</strong>
                <span>{review.date}</span>
              </div>
              <p className="review-content"><strong>Nội dung đánh giá:</strong> {review.content}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews">Chưa có đánh giá nào. Hãy là người đầu tiên thêm đánh giá!</p>
        )}
      </div>

      {reviews.length > 4 && (
        <div className="scroll-more">
          <button className="btn btn-secondary" onClick={() => setReviews(reviews)}>Xem thêm đánh giá</button>
        </div>
      )}

      <div className="add-review-form">
        <h4 className="form-title">Thêm Đánh Giá Của Bạn</h4>
        {user ? (
          <div>
            <textarea
              className="form-control"
              placeholder="Viết đánh giá của bạn tại đây..."
              value={newReview}
              onChange={handleReviewChange}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={handleAddReview}
            >
              Đăng Đánh Giá
            </button>
          </div>
        ) : (
          <p className="login-warning">Vui lòng đăng nhập để thêm đánh giá.</p>
        )}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default ProductReview;
