import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTable, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 40px;
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
  font-family: "Poppins", sans-serif;
`;

const TableContainer = styled.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 15px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin: 0 auto 30px auto;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #3498db;
  color: white;
  font-size: 1.1rem;
  padding: 15px;
  border: 1px solid #ddd;
  font-family: "Poppins", sans-serif;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  font-size: 1rem;
  background-color: #f8f9fa;
  font-family: "Poppins", sans-serif;
`;

const ViewButton = styled.button`
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #2471a3;
  }
`;

const NoDataMessage = styled.p`
  text-align: center;
  font-size: 1.3rem;
  color: #e74c3c;
  margin-top: 30px;
  font-family: "Poppins", sans-serif;
`;

const AdminPanel = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimetables = async () => {
      setLoading(true);
      setError("");
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${BASE_URL}/admin/timetables`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setTimetables(data.timetables || []);
        } else {
          setError(data.error || "Failed to fetch timetables.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTimetables();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/timetable-details?id=${id}`);
  };

  return (
    <Container>
      <Title>
        <FaTable style={{ marginRight: 10 }} /> Admin Panel: Generated Timetables
      </Title>
      <TableContainer>
        {loading ? (
          <NoDataMessage>Loading timetables...</NoDataMessage>
        ) : error ? (
          <NoDataMessage>{error}</NoDataMessage>
        ) : timetables.length === 0 ? (
          <NoDataMessage>No timetables have been generated yet.</NoDataMessage>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>#</Th>
                <Th>College</Th>
                <Th>Branch</Th>
                <Th>Generated At</Th>
                <Th>Total Classes</Th>
                <Th>Total Subjects</Th>
                <Th>Includes Labs</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {timetables.map((tt, idx) => (
                <tr key={tt._id || idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{tt.collegeName}</Td>
                  <Td>{tt.branchName}</Td>
                  <Td>{tt.metadata?.generatedAt ? new Date(tt.metadata.generatedAt).toLocaleString() : "-"}</Td>
                  <Td>{tt.metadata?.stats?.totalClasses || "-"}</Td>
                  <Td>{tt.metadata?.stats?.totalSubjects || "-"}</Td>
                  <Td>{tt.metadata?.stats?.includesLabs ? "Yes" : "No"}</Td>
                  <Td>
                    <ViewButton onClick={() => handleViewDetails(tt._id)}> <FaEye /> View Details </ViewButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default AdminPanel;
