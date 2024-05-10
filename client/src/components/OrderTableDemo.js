import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";

function TableHeader() {
  return (
    <Toolbar className="!flex-1 !justify-center">
      <Typography className="!font-semibold" component="h5" variant="h5">
        Mô tả đơn hàng
      </Typography>
    </Toolbar>
  );
}

export default function OrderTableDemo({data} ) {
  console.log(data)
  return (
    <Box component={"div"}>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          marginBottom: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper>
          <TableHeader />
          <TableContainer>
            <Table size="small" className="md:min-w-[700px]">
            <TableBody>
              {data ? (
                <>
                  <TableRow key={"ebooks"}>
                    <TableCell align="left">Tên eBook</TableCell>
                    <TableCell align="left">Đơn giá</TableCell>
                    <TableCell align="left">Download</TableCell> {/* New column for the Download button */}
                  </TableRow>
                  <TableRow key={0}>
                    <TableCell align="left">{data["ebooks"][0]["name"]}</TableCell>
                    <TableCell align="left">{`${data["ebooks"][0]["price"]} VNĐ`}</TableCell>
                    <TableCell align="left">
                      <a
                        href={`http://localhost:6020/api/ebook/download/${data["ebooks"][0]["ebook"]["_id"]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="download-button">Download</button>
                      </a>
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <TableRow key={0} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center" colSpan={4}>
                    Không có thông tin đơn hàng
                  </TableCell>
                </TableRow>
              )}
            </TableBody>


            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}