"use client";
import React, { useState, useEffect } from "react";

// --- MUI Components (Conceptual Representation) ---
const Box = ({ children, sx, ...props }) => (
  <div style={sx} {...props}>
    {children}
  </div>
);
const Container = ({ children, sx, ...props }) => (
  <div
    style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px", ...sx }}
    {...props}
  >
    {children}
  </div>
);
const AppBar = ({ children, sx, ...props }) => (
  <header
    style={{
      backgroundColor: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1100,
      ...sx,
    }}
    {...props}
  >
    {children}
  </header>
);
const Toolbar = ({ children, sx, ...props }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      minHeight: "64px",
      padding: "0 16px",
      ...sx,
    }}
    {...props}
  >
    {children}
  </div>
);
const Typography = ({ children, variant, sx, ...props }) => {
  const styles = {
    h1: { fontSize: "2.5rem", fontWeight: 700, margin: 0 },
    h2: { fontSize: "2rem", fontWeight: 700, margin: 0 },
    h3: { fontSize: "1.75rem", fontWeight: 700, margin: 0 },
    h4: { fontSize: "1.5rem", fontWeight: 600, margin: 0 },
    h5: { fontSize: "1.25rem", fontWeight: 600, margin: 0 },
    body1: { fontSize: "1rem", margin: 0 },
    body2: { fontSize: "0.875rem", color: "#555", margin: 0 },
  };
  return (
    <p style={{ ...styles[variant], ...sx }} {...props}>
      {children}
    </p>
  );
};
const Button = ({
  children,
  variant = "contained",
  sx,
  disabled,
  ...props
}) => {
  const baseStyle = {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontFamily: "sans-serif",
    transition: "background-color 0.3s",
  };
  const variants = {
    contained: { backgroundColor: "#007bff", color: "#fff" },
    text: { backgroundColor: "transparent", color: "#007bff" },
  };
  const disabledStyle = disabled
    ? { backgroundColor: "#bdbdbd", cursor: "not-allowed" }
    : {};
  return (
    <button
      style={{ ...baseStyle, ...variants[variant], ...sx, ...disabledStyle }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
const Card = ({ children, sx, ...props }) => (
  <div
    style={{
      backgroundColor: "#fff",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      overflow: "hidden",
      ...sx,
    }}
    {...props}
  >
    {children}
  </div>
);
const CardHeader = ({ title, sx }) => (
  <Box
    sx={{
      padding: "12px 24px",
      backgroundColor: "#f8f9fa",
      borderBottom: "1px solid #e0e0e0",
      ...sx,
    }}
  >
    <Typography variant="h5" sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
  </Box>
);
const CardContent = ({ children, sx, ...props }) => (
  <div style={{ padding: "24px", ...sx }} {...props}>
    {children}
  </div>
);
const TextField = (props) => (
  <input
    style={{
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxSizing: "border-box",
      fontFamily: "sans-serif",
      fontSize: "1rem",
    }}
    {...props}
  />
);
const Select = ({ children, ...props }) => (
  <select
    style={{
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxSizing: "border-box",
      backgroundColor: "white",
      fontFamily: "sans-serif",
      fontSize: "1rem",
    }}
    {...props}
  >
    {children}
  </select>
);
const MenuItem = ({ children, ...props }) => (
  <option {...props}>{children}</option>
);
const Paper = ({ children, sx, ...props }) => (
  <div
    style={{
      backgroundColor: "#fff",
      padding: "16px",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      ...sx,
    }}
    {...props}
  >
    {children}
  </div>
);
const Divider = ({ sx }) => (
  <hr
    style={{
      border: "none",
      borderTop: "1px solid #e0e0e0",
      margin: "16px 0",
      ...sx,
    }}
  />
);
const Grid = ({
  container,
  item,
  spacing = 2,
  xs,
  sm,
  md,
  lg,
  children,
  sx,
  ...props
}) => {
  const containerStyle = container
    ? { display: "flex", flexWrap: "wrap", margin: `-${spacing * 8}px` }
    : {};
  const itemStyle = item
    ? { padding: `${spacing * 8}px`, boxSizing: "border-box" }
    : {};
  const width =
    { 12: "100%", 6: "50%", 4: "33.33%", 3: "25%" }[xs || sm || md || lg] ||
    "auto";
  return (
    <div style={{ ...containerStyle, ...itemStyle, width, ...sx }} {...props}>
      {children}
    </div>
  );
};

// --- MUI Icons (Inline SVG Placeholders) ---
const UserIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const HomeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const CalendarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const ClipboardListIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
);
const BarChart2Icon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const DollarSignIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const MessageSquareIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const UserCheckIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);
const BookIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const DownloadIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const BellIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

// --- Data ---
const curriculumData = {
  englishMedium: {
    classNursery: [],
    classLKG: [],
    classUKG: [],
    class1: [],
    class2: [],
    class3: [],
    class4: [],
    class5: [],
    class6: [],
    class7: [],
    class8: [],
    class9: [],
    class10: [],
    class12: {
      commerce: {
        v1: {
          name: "Accountancy + Business Studies + Economics + Mathematics + English",
          subjects: [],
        },
        v2: {
          name: "Accountancy + Business Studies + Economics + Informatics Practices + English",
          subjects: [],
        },
        v3: {
          name: "Accountancy + Business Studies + Economics + Entrepreneurship + English",
          subjects: [],
        },
        v4: {
          name: "Accountancy + Business Studies + Economics + Legal Studies + English",
          subjects: [],
        },
        v5: {
          name: "Accountancy + Business Studies + Economics + Physical Education + English",
          subjects: [],
        },
      },
      science: {
        v1: {
          name: "PCM: Physics + Chemistry + Mathematics + English + Computer Science",
          subjects: [],
        },
        v2: {
          name: "PCB: Physics + Chemistry + Biology + English + Physical Education",
          subjects: [],
        },
        v3: {
          name: "PCM + Bio: Physics + Chemistry + Mathematics + Biology + English",
          subjects: [],
        },
        v4: {
          name: "PCM + IP: Physics + Chemistry + Mathematics + English + Informatics Practices",
          subjects: [],
        },
        v5: {
          name: "PCB + Biotech: Physics + Chemistry + Biology + English + Biotechnology",
          subjects: [],
        },
      },
      arts: {
        v1: {
          name: "History + Political Science + Geography + English + Economics",
          subjects: [],
        },
        v2: {
          name: "Psychology + Sociology + Political Science + English + History",
          subjects: [],
        },
        v3: {
          name: "Geography + History + Political Science + English + Physical Education",
          subjects: [],
        },
        v4: {
          name: "Economics + Sociology + Political Science + English + Mathematics",
          subjects: [],
        },
        v5: {
          name: "History + Political Science + Sociology + English + Hindi",
          subjects: [],
        },
      },
    },
  },
};
curriculumData.englishMedium.class11 = curriculumData.englishMedium.class12;
const dummyData = {
  profile: {
    admissionNo: "12345",
    rollNo: "21",
    house: "Blue House",
    fatherName: "Mr. Kumar",
  },
  attendance: { total: 120, present: 115, absent: 5, percentage: 96 },
  fees: { total: 50000, paid: 40000, due: 10000, dueDate: "2025-09-30" },
  notices: [
    { id: 1, title: "Annual Sports Day", date: "2025-09-05" },
    { id: 2, title: "Parent-Teacher Meeting for Class 5", date: "2025-09-02" },
    { id: 3, title: "Holiday on account of Festival", date: "2025-08-28" },
  ],
};

// --- Layout & Static Pages ---
const MUIHeader = ({ setCurrentPage, studentProfile, setStudentProfile }) => {
  const logoUrl = "https://i.ibb.co/L9qS82F/og.jpg";
  const handleLogout = () => {
    localStorage.removeItem("studentProfile");
    setStudentProfile(null);
    setCurrentPage("home");
  };

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => setCurrentPage("home")}
          >
            <img
              src={logoUrl}
              alt="National Remote School Logo"
              style={{ height: "48px", width: "auto" }}
            />
          </Box>
          <Box>
            {studentProfile ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Welcome, {studentProfile.name}!
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  sx={{ backgroundColor: "#d32f2f" }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={() => setCurrentPage("dashboard")}
              >
                Student Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const MUIFooter = () => (
  <Box sx={{ backgroundColor: "#212121", color: "white", padding: "16px 0" }}>
    <Container>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        Copyright © {new Date().getFullYear()} National Remote School. All
        Rights Reserved.
      </Typography>
    </Container>
  </Box>
);

const MUIHomePage = ({ setCurrentPage }) => (
  <Container
    sx={{
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "32px 16px",
    }}
  >
    <Typography variant="h1" sx={{ marginBottom: "24px" }}>
      National Remote School
    </Typography>
    <Typography
      variant="h5"
      sx={{ color: "#555", maxWidth: "700px", marginBottom: "32px" }}
    >
      Your digital campus for a brighter future.
    </Typography>
    <Button
      variant="contained"
      sx={{ padding: "16px 32px", fontSize: "1.1rem" }}
      onClick={() => setCurrentPage("dashboard")}
    >
      Student Portal Login
    </Button>
  </Container>
);

// --- Student Setup Page ---
const MUIStudentSetupPage = ({ setStudentProfile }) => {
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("englishMedium");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");

  const classes = [
    { label: "Nursery", value: "classNursery" },
    { label: "LKG", value: "classLKG" },
    { label: "UKG", value: "classUKG" },
    { label: "1", value: "class1" },
    { label: "2", value: "class2" },
    { label: "3", value: "class3" },
    { label: "4", value: "class4" },
    { label: "5", value: "class5" },
    { label: "6", value: "class6" },
    { label: "7", value: "class7" },
    { label: "8", value: "class8" },
    { label: "9", value: "class9" },
    { label: "10", value: "class10" },
    { label: "11", value: "class11" },
    { label: "12", value: "class12" },
  ];

  const showStreamSelector =
    selectedClass === "class11" || selectedClass === "class12";
  const availableStreams =
    showStreamSelector && curriculumData[selectedMedium]?.[selectedClass]
      ? Object.keys(curriculumData[selectedMedium][selectedClass])
      : [];
  const availableVariants =
    showStreamSelector &&
    selectedStream &&
    curriculumData[selectedMedium]?.[selectedClass]?.[selectedStream]
      ? curriculumData[selectedMedium][selectedClass][selectedStream]
      : null;

  useEffect(() => {
    setSelectedStream("");
    setSelectedVariant("");
  }, [selectedClass, selectedMedium]);
  useEffect(() => {
    setSelectedVariant("");
  }, [selectedStream]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = {
      name,
      class: selectedClass.replace("class", ""),
      medium: selectedMedium,
      stream: selectedStream,
      variant: selectedVariant,
    };
    if (name && selectedClass) {
      if (showStreamSelector && (!selectedStream || !selectedVariant)) {
        alert("Please select your stream and subject combination.");
        return;
      }
      localStorage.setItem("studentProfile", JSON.stringify(profile));
      setStudentProfile(profile);
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        padding: "32px 0",
      }}
    >
      <Card sx={{ maxWidth: "450px", width: "100%" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <UserIcon
            style={{
              height: "64px",
              width: "64px",
              margin: "0 auto",
              color: "#007bff",
            }}
          />
          <Typography variant="h2" sx={{ margin: "16px 0" }}>
            Student Login
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <TextField
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              required
            >
              <MenuItem value="" disabled>
                Select your class
              </MenuItem>
              {classes.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
            {showStreamSelector && (
              <>
                <Select
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value)}
                  required
                >
                  <MenuItem value="" disabled>
                    Select your stream
                  </MenuItem>
                  {availableStreams.map((s) => (
                    <MenuItem
                      key={s}
                      value={s}
                      style={{ textTransform: "capitalize" }}
                    >
                      {s}
                    </MenuItem>
                  ))}
                </Select>
                {availableVariants && (
                  <Select
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    required
                  >
                    <MenuItem value="" disabled>
                      Select a combination
                    </MenuItem>
                    {Object.entries(availableVariants).map(([key, variant]) => (
                      <MenuItem key={key} value={key}>
                        {variant.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </>
            )}
            <Button type="submit" variant="contained" sx={{ padding: "12px" }}>
              Login to Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

// --- REDESIGNED CAMPUSCARE-STYLE DASHBOARD ---
const SidebarItem = ({ icon, label, active, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "12px 20px",
      color: active ? "#007bff" : "#333",
      backgroundColor: active ? "#e3f2fd" : "transparent",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: active ? 600 : 400,
      borderLeft: active ? "4px solid #007bff" : "4px solid transparent",
      transition: "background-color 0.2s",
      "&:hover": {
        backgroundColor: "#f4f6f8",
      },
    }}
  >
    {icon}
    <Typography variant="body1" sx={{ ml: 2 }}>
      {label}
    </Typography>
  </Box>
);

const DashboardHomeView = ({ studentProfile }) => {
  const AttendancePieChart = ({ percentage }) => {
    const strokeDasharray = `${percentage} ${100 - percentage}`;
    return (
      <Box
        sx={{
          position: "relative",
          width: "120px",
          height: "120px",
          margin: "0 auto",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#4caf50"
            strokeWidth="3"
            strokeDasharray={strokeDasharray}
            strokeDashoffset="25"
          />
        </svg>
        <Typography
          variant="h3"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {percentage}%
        </Typography>
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Student Profile" />
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <UserIcon
                style={{
                  height: "80px",
                  width: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#eee",
                  padding: "10px",
                }}
              />
              <Box sx={{ ml: 3 }}>
                <Typography variant="h3">{studentProfile.name}</Typography>
                <Typography variant="body1">
                  Class {studentProfile.class}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Admission No: {dummyData.profile.admissionNo}
                </Typography>
                <Typography variant="body2">
                  House: {dummyData.profile.house}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Attendance" />
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <AttendancePieChart
                percentage={dummyData.attendance.percentage}
              />
              <Box>
                <Typography variant="body1">
                  <strong>Total:</strong> {dummyData.attendance.total}
                </Typography>
                <Typography variant="body1" sx={{ color: "green" }}>
                  <strong>Present:</strong> {dummyData.attendance.present}
                </Typography>
                <Typography variant="body1" sx={{ color: "red" }}>
                  <strong>Absent:</strong> {dummyData.attendance.absent}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Fee Details" />
            <CardContent>
              <Typography variant="h3" sx={{ color: "#d32f2f", mb: 1 }}>
                ₹{dummyData.fees.due.toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Total Due Amount
              </Typography>
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Typography variant="body2">
                  Total Paid: ₹{dummyData.fees.paid.toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Due Date: {dummyData.fees.dueDate}
                </Typography>
              </Box>
              <Button variant="contained" sx={{ width: "100%", mt: 3 }}>
                Pay Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Notice Board" />
            <CardContent>
              {dummyData.notices.map((notice) => (
                <Box
                  key={notice.id}
                  sx={{
                    display: "flex",
                    gap: "12px",
                    mb: 2,
                    alignItems: "center",
                  }}
                >
                  <BellIcon style={{ color: "#007bff" }} />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {notice.title}
                    </Typography>
                    <Typography variant="body2">
                      Posted on: {notice.date}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const PlaceholderView = ({ title }) => (
  <Paper sx={{ p: 4 }}>
    <Typography variant="h2">{title}</Typography>
    <Typography variant="body1" sx={{ mt: 2 }}>
      This section is under development.
    </Typography>
  </Paper>
);

const MUIDashboardPage = ({ studentProfile }) => {
  const [activeView, setActiveView] = useState("dashboard");

  const sidebarItems = [
    { id: "dashboard", icon: <HomeIcon />, label: "Dashboard" },
    { id: "profile", icon: <UserIcon />, label: "My Profile" },
    { id: "attendance", icon: <UserCheckIcon />, label: "Attendance" },
    { id: "homework", icon: <ClipboardListIcon />, label: "Homework" },
    { id: "timetable", icon: <CalendarIcon />, label: "Timetable" },
    { id: "results", icon: <BarChart2Icon />, label: "Results" },
    { id: "fees", icon: <DollarSignIcon />, label: "Fees" },
    { id: "notice", icon: <MessageSquareIcon />, label: "Notice Board" },
    { id: "subjects", icon: <BookIcon />, label: "My Subjects" },
    { id: "downloads", icon: <DownloadIcon />, label: "Downloads" },
  ];

  const renderView = () => {
    if (activeView === "dashboard")
      return <DashboardHomeView studentProfile={studentProfile} />;
    const activeItem = sidebarItems.find((item) => item.id === activeView);
    return <PlaceholderView title={activeItem ? activeItem.label : "Page"} />;
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1, backgroundColor: "#f8f9fa" }}>
      {/* Sidebar */}
      <Paper
        sx={{
          width: "280px",
          display: "flex",
          flexDirection: "column",
          p: 2,
          borderRadius: 0,
          borderRight: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ p: 2, textAlign: "center", mb: 2 }}>
          <UserIcon
            style={{
              height: "80px",
              width: "80px",
              borderRadius: "50%",
              backgroundColor: "#e3f2fd",
              padding: "10px",
              color: "#007bff",
              margin: "0 auto",
            }}
          />
          <Typography variant="h4" sx={{ mt: 2 }}>
            {studentProfile.name}
          </Typography>
          <Typography variant="body1">Class: {studentProfile.class}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: "8px" }}
        >
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeView === item.id}
              onClick={() => setActiveView(item.id)}
            />
          ))}
        </Box>
      </Paper>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flex: 1, p: 4, overflowY: "auto", height: "calc(100vh - 64px)" }}
      >
        {renderView()}
      </Box>
    </Box>
  );
};

// --- Main App Component ---
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [studentProfile, setStudentProfile] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("studentProfile");
      if (savedProfile) {
        setStudentProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Failed to parse profile", error);
    }
    setIsLoadingProfile(false);
  }, []);

  const renderContent = () => {
    if (isLoadingProfile)
      return (
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading...
        </div>
      );

    let pageContent;
    switch (currentPage) {
      case "home":
        pageContent = <MUIHomePage setCurrentPage={setCurrentPage} />;
        break;
      case "dashboard":
        pageContent = studentProfile ? (
          <MUIDashboardPage studentProfile={studentProfile} />
        ) : (
          <MUIStudentSetupPage setStudentProfile={setStudentProfile} />
        );
        break;
      default:
        pageContent = <MUIHomePage setCurrentPage={setCurrentPage} />;
    }

    // The dashboard has its own layout
    if (currentPage === "dashboard" && studentProfile) {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            fontFamily: "sans-serif",
          }}
        >
          <MUIHeader
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            studentProfile={studentProfile}
            setStudentProfile={setStudentProfile}
          />
          {pageContent}
        </Box>
      );
    }

    // Standard pages get the header and footer
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
        }}
      >
        <MUIHeader
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          studentProfile={studentProfile}
          setStudentProfile={setStudentProfile}
        />
        <Box
          component="main"
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          {pageContent}
        </Box>
        <MUIFooter />
      </Box>
    );
  };

  return renderContent();
}
