# Kiến Trúc Git Graph Visualizer

## 1. Thuật toán phân bố làn (Lane Management)
Git Graph chuyển đổi đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG) thành tọa độ 2D:
- Trục X: Sắp xếp theo thứ tự thời gian/thứ tự topo của các commit.
- Trục Y: Mỗi nhánh (Branch) được gán một "làn" (lane) riêng biệt để tránh xung đột đường nối. Làn chính `main` nằm ở lane 0.

## 2. Đường cong kết nối (Bezier Curves)
Khi nhánh phân tách hoặc hợp nhất (Merge):
- Đường thẳng được sử dụng khi 2 commit nằm trên cùng một làn.
- Đường cong bậc ba (Cubic Bezier curve) nối từ `(fromX, fromY)` đến `(toX, toY)` với điểm điều khiển `controlX = fromX + dx * 0.5`.
- Merge commit hiển thị nét đứt `stroke-dasharray="4,4"` để làm nổi bật nhánh phụ được hợp nhất vào nhánh chính.

## 3. Hiệu ứng đồ họa (Glow & Pulse)
- Commit tại vị trí con trỏ `HEAD` được gắn bộ lọc `feGaussianBlur` tạo vòng tròn phát sáng (glow effect).
- Nhãn nhánh (`main`, `feature`) hiển thị ngay trên node commit tương ứng.
