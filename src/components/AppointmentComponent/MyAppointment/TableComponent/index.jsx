import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
export default function TableComponent({
  tableData,
  handleCancelBtn,
  handleRescheduleBtn,
  type,
}) {
  return (
    <div
      style={{
        overflowX: "auto",
      }}
    >
      <TableContainer
        sx={{
          borderRadius: "20px",
          // maxHeight: "500px",
          maxHeight: "60vh",
          padding: "2%",
          width: "95%",
          overflowY: "auto",
        }}
        component={Paper}
      >
        <Table
          sx={{
            "& .MuiTableCell-root": {
              fontWeight: "700",
              fontSize: "20px",
              color: "#000000 ",
            },
            minWidth: 650,
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead
            sx={{
              borderBottom: "3px solid #000000",
            }}
          >
            <TableRow>
              <TableCell>Sl.No</TableCell>
              <TableCell align="center">Expert Name</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Mode</TableCell>
              {!type && (
                <>
                  {" "}
                  <TableCell align="center">Cancel</TableCell>
                  <TableCell align="center">Re-schedule</TableCell>
                  <TableCell align="center">Link</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData?.map((row, idx) => (
              <TableRow
                key={row?.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  borderBottom: "1px dashed #000000",
                }}
              >
                <TableCell align="center">{idx + 1}</TableCell>
                <TableCell align="center">
                  {row.expertId?.userId?.name}
                </TableCell>
                <TableCell align="center">{row.startTime}</TableCell>
                <TableCell align="center">{row.startDate}</TableCell>
                <TableCell align="center">{row.modeOfConsultation}</TableCell>
                {!type && (
                  <>
                    <TableCell align="center">
                      <span
                        style={{
                          color: "#C2478A",
                          cursor: "pointer",
                        }}
                        onClick={() => handleCancelBtn(row)}
                      >
                        Cancel
                      </span>
                    </TableCell>{" "}
                    <TableCell align="center">
                      <span
                        style={{
                          color: "#C2478A",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRescheduleBtn(row)}
                      >
                        Re-Schedule
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <Link to={row.meetingLink} target="_blank">
                        <span
                          style={{
                            color: "#2F2564",
                            cursor: "pointer",
                          }}
                        >
                          Join
                        </span>
                      </Link>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
