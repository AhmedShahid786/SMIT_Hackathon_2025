import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Person as PersonIcon,
  ContactPhone as PhoneIcon,
  LocationOn as LocationIcon,
  CreditCard as CnicIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import axios from "axios";
import { routes } from "../constants/routes";
import Cookies from "js-cookie";

const Receptionist = () => {
  const [beneficiaryData, setBeneficiaryData] = useState({
    name: "",
    cnic: "",
    number: "",
    address: "",
    purpose: "",
  });

  const [files, setFiles] = useState({
    image: null,
    cnicFront: null,
    cnicBack: null,
  });

  const [beneficiary, setBeneficiary] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBeneficiaryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();

    // Append beneficiary data
    Object.keys(beneficiaryData).forEach((key) => {
      formData.append(key, beneficiaryData[key]);
    });

    // Append files
    formData.append("image", files.image);
    formData.append("cnicImage.front", files.cnicFront);
    formData.append("cnicImage.back", files.cnicBack);

    try {
      const beneficiaryResponse = await axios.post(
        routes.addBeneficiary,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setBeneficiary(beneficiaryResponse.data.data);
    } catch (error) {
      console.error("Error submitting beneficiary:", error);
      setLoading(false);
    }
  };

  const generateToken = async () => {
    try {
      const tokenResponse = await axios.post("/api/token", {
        beneficiary: beneficiary._id,
        department: "health",
      });
      setToken(tokenResponse.data.data);
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Beneficiary Registration
        </Typography>

        {!beneficiary ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={beneficiaryData.name}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CNIC"
                  name="cnic"
                  value={beneficiaryData.cnic}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CnicIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="number"
                  value={beneficiaryData.number}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={beneficiaryData.address}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Purpose"
                  name="purpose"
                  value={beneficiaryData.purpose}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<UploadIcon />}
                >
                  Profile Image
                  <input
                    type="file"
                    name="image"
                    hidden
                    onChange={handleFileChange}
                    required
                  />
                </Button>
                {files.image && (
                  <Typography variant="body2">{files.image.name}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<UploadIcon />}
                >
                  CNIC Front
                  <input
                    type="file"
                    name="cnicFront"
                    hidden
                    onChange={handleFileChange}
                    required
                  />
                </Button>
                {files.cnicFront && (
                  <Typography variant="body2">
                    {files.cnicFront.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<UploadIcon />}
                >
                  CNIC Back
                  <input
                    type="file"
                    name="cnicBack"
                    hidden
                    onChange={handleFileChange}
                    required
                  />
                </Button>
                {files.cnicBack && (
                  <Typography variant="body2">{files.cnicBack.name}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Registering" : "Register Beneficiary"}
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Box>
            <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Beneficiary Details</h2>
              <div className="mb-4 space-y-2">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {beneficiary.name}
                </p>
                <p>
                  <span className="font-semibold">CNIC:</span>{" "}
                  {beneficiary.cnic}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {beneficiary.number}
                </p>
                <p>
                  <span className="font-semibold">Purpose:</span>{" "}
                  {beneficiary.purpose}
                </p>
                <p>
                  <span className="font-semibold">Request Status:</span>{" "}
                  {beneficiary.purposeStatus}
                </p>
                <p>
                  <span className="font-semibold">Visits:</span>{" "}
                  {beneficiary.visit}
                </p>
              </div>
              <div className="flex gap-4">
                <img
                  src={beneficiary.image}
                  alt="Profile"
                  className="w-36 h-36 object-cover rounded-md shadow"
                />
                <img
                  src={beneficiary.cnicImage.front}
                  alt="CNIC Front"
                  className="w-36 h-36 object-cover rounded-md shadow"
                />
                <img
                  src={beneficiary.cnicImage.back}
                  alt="CNIC Back"
                  className="w-36 h-36 object-cover rounded-md shadow"
                />
              </div>
            </div>

            {!token ? (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={generateToken}
              >
                Generate Token
              </Button>
            ) : (
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6">Token Details</Typography>
                <Typography>Token ID: {token.tokenId}</Typography>
                <Typography>Department: {token.department}</Typography>
                <Typography>Status: {token.status}</Typography>
              </Paper>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Receptionist;
