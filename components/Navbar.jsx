"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
// MUI imports (all in one)
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Button,
} from "@mui/material";

// Icons
import { Menu as MenuIcon, Google } from "@mui/icons-material";

// Local imports
import ThemeTogglerBtn from "./ThemeTogglerBtn";
import DashboardNavbar from "./DashboardNavbar";
import ScrollTop from "./ScrollToTop";
import { signInUser } from "@/lib/Backend";
import icon from "@/img/icon.png";
import SignOutButton from "./SignOutButton";

const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Features", path: "/features" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname() || "/";
  const isDashboard = pathname.startsWith("/dashboard");
  const [user, setUser] = React.useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignIn = async () => {
    const { data, error } = await signInUser();
    if (error) {
      console.error("Sign in error:", error);
    } else {
      // console.log("Sign in action:", data);
      setUser({
        uid: data.id,
        name: data.name,
        email: data.email,
        photoURL: data.photoURL,
        class: data?.class,
      });
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userPic", data.photoURL);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userClass", data.class);
      localStorage.setItem(
        "userDbUrl",
        `/dashboard/${data.role}/CLASS-${data.class}`
      );
      if (data?.class) {
        redirect(`/dashboard/${data.role}/CLASS-${data.class}`);
      } else {
        redirect("/dashboard");
      }
    }
  };
  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userPic = localStorage.getItem("userPic");
    const userClass = localStorage.getItem("userClass");
    const userRole = localStorage.getItem("userRole");

    if (userId) {
      setUser({
        uid: userId,
        name: userName,
        email: userEmail,
        photoURL: userPic,
        class: userClass,
        role: userRole || "student",
      });
    }
  }, []);
  if (isDashboard) {
    // render dashboard navbar immediately with no flash
    return <DashboardNavbar />;
  }

  return (
    <AppBar position="static" sx={{ borderRadius: "2rem", mb: "1rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* logo here */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              mt: 0.8,
            }}
          >
            <Image
              src={icon}
              alt="Logo"
              className="menu-logo"
              height={500}
              width={500}
              placeholder="blur"
            />
            National Remote School
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account Options of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* Mobile Menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <Link
                  key={page.name}
                  href={page.path}
                  className={pathname === page.path ? "active" : ""}
                >
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography sx={{ fontWeight: "medium" }}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          {/* logo here */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              mt: 0.8,
            }}
          >
            <Image
              src={icon}
              alt="Logo"
              className="menu-logo"
              height={500}
              width={500}
              placeholder="blur"
            />
            N.R.S
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page.name}
                href={page.path}
                className={pathname === page.path ? "active" : ""}
              >
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography sx={{ fontWeight: "medium" }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              </Link>
            ))}
          </Box>
          <ThemeTogglerBtn />
          &nbsp;&nbsp;
          {/* Account Section */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Account Options">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.name} src={user.photoURL} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    {user.class ? (
                      <Link
                        href={`/dashboard/${user.role}/${user.class}`}
                        className={
                          pathname === `/dashboard/${user.role}/${user.class}`
                            ? "active"
                            : ""
                        }
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/dashboard"
                        className={pathname === "/dashboard" ? "active" : ""}
                      >
                        Dashboard
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <SignOutButton />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Tooltip title="Account">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Learner" src="/user.webp" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      sx={{ textAlign: "center" }}
                      variant="outlined"
                      size="small"
                      color="success"
                      onClick={handleSignIn}
                    >
                      <Google />
                      &nbsp;Sign In/Up With Google
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      <ScrollTop />
    </AppBar>
  );
};
export default Navbar;
