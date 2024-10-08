"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DzongkhagList = () => {
  const [dzongkhags, setDzongkhags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state with type

  useEffect(() => {
    // Fetch dzongkhag data from the backend API
    const fetchDzongkhags = async () => {
      try {
        const response = await fetch("http://localhost:9999/dzongkhags");
        if (!response.ok) {
          throw new Error("Failed to fetch dzongkhag data");
        }
        const data = await response.json();
        console.log("Fetched dzongkhags:", data);
        setDzongkhags(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDzongkhags();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Dzongkhag List</h1>
      <Table>
        <TableCaption>A list of all 20 Dzongkhags.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Dzongkhag_id</TableHead>
            <TableHead>Dzongkhag_name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dzongkhags.map((dzongkhag: any) => (
            <TableRow key={dzongkhag.dzongkhag_id}>
              <TableCell className="font-medium">
                {dzongkhag.dzongkhag_id}
              </TableCell>
              <TableCell>{dzongkhag.dzongkhag_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DzongkhagList;
