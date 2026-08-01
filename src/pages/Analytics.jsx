import { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Analytics() {
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [genreCount, setGenreCount] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const total = await api.get("/analytics/total-albums");
      const average = await api.get("/analytics/average-rating");
      const genre = await api.get("/analytics/genre-count");
      const top = await api.get("/analytics/top-rated");

      setTotalAlbums(total.data);
      setAverageRating(average.data);
      setGenreCount(genre.data);
      setTopRated(top.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load analytics");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Analytics Dashboard</h1>

      <hr />

      <h3>Total Albums: {totalAlbums}</h3>
      <h3>Average Rating: {averageRating}</h3>

      <hr />

      <h2>Albums By Genre</h2>

      <BarChart width={500} height={300} data={genreCount}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="genre" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      <hr />

      <h2>Genre Distribution</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={genreCount}
          dataKey="count"
          nameKey="genre"
          outerRadius={100}
          label
        >
          {genreCount.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <hr />

      <h2>Average Rating</h2>

      <LineChart
        width={500}
        height={300}
        data={[{ name: "Average", rating: averageRating }]}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="rating"
          stroke="#82ca9d"
        />
      </LineChart>

      <hr />

      <h2>Top Rated Albums</h2>

      <BarChart width={600} height={300} data={topRated}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="albumName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rating" fill="#ff7300" />
      </BarChart>
    </div>
  );
}

export default Analytics;