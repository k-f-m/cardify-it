import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Card,
  CardMedia,
  Link,
  List,
  ListItem,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete, Edit, InfoRounded } from "@mui/icons-material";

// Render the cards and manage the state of the form used to create, update, and delete cards
function CardList({ name, data, onCreate, onUpdate, onDelete, error }) {
  console.log(`CardList: ${JSON.stringify(data)}`);

  // Create and initialize state variable to keep track of form data
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    productUrl: "",
    imageUrl: "",
    addToCardId: "",
  });
  // Create and initialize editingID state variable to keep track of ID of item being edited in the form
  const [editingId, setEditingId] = useState(null);

  // Update formData state variable whenever the editingId or data props change
  useEffect(() => {
    if (editingId === null) {
      setFormData({
        id: "",
        name: "",
        description: "",
        productUrl: "",
        imageUrl: "",
        addToCardId: "",
      });
    } else {
      const currentItem = data.find((item) => item.id === editingId);
      setFormData(currentItem);
    }
  }, [editingId, data]);

  // Update formData state variable with the new value whenever a form input changes
  const handleFormChange = (event) => {
    console.log(`handleFormChange: ${event.target.name} ${event.target.value}`);

    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Call onUpdate or onCreate whenever form is submitted then reset fromData state variable
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`formData: ${JSON.stringify(formData)}`);

    if (editingId !== null) {
      console.log(`update item: ${JSON.stringify(formData)}`);
      onUpdate(formData);
    } else {
      onCreate(formData);
    }

    setFormData({
      id: "",
      name: "",
      description: "",
      productUrl: "",
      imageUrl: "",
      addToCardId: "",
    });
    setEditingId(null);
  };

  // Set the editingId state variable to the id of the item being edited when the edit button is clicked
  const handleEdit = (id) => {
    setEditingId(id);
  };

  // Reset the formData state variable to its initial state and set editingId to null
  const handleCancel = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      productUrl: "",
      imageUrl: "",
      addToCardId: "",
    });
    setEditingId(null);
  };

  // Call the onDelete prop with the id of the item being deleted when the delete button clicked
  const handleDelete = (id) => {
    onDelete(id);
  };

  // The CardList function returns a list of cards populated with form or API data 
  return (
    <Box
      className="Box"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>{name}</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <TextField
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleFormChange}
        />
        <TextField
          label="Product URL"
          name="productUrl"
          value={formData.productUrl}
          onChange={handleFormChange}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleFormChange}
        />
        <TextField
          label="Add to Card ID"
          name="addToCardId"
          value={formData.addToCardId}
          onChange={handleFormChange}
        />
        <Button sx={{ mr: 1 }} variant="contained" type="submit">
          {editingId === null ? "Create" : "Update"}
        </Button>
        {editingId !== null && (
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </form>
      <List sx={{ width: "100%", maxWidth: 360, paddingTop: 2.5 }}>
        {data.map((item) => (
          <Card
            variant="outlined"
            sx={{
              p: 1,
              borderRadius: 5.5,
              boxShadow: "0 1px 3px rgba(0, 127, 255, 0.1)",
              display: "flex",
              flexDirection: {
                xs: "column", // mobile
                sm: "row", // tablet and up
              },
            }}
          >
            <ListItem>
              <CardMedia
                component="img"
                width="100"
                height="100"
                alt={item.name}
                src={item.imageUrl}
                sx={{
                  borderRadius: 1,
                  width: { xs: "100%", sm: 100 },
                  mr: { sm: 1.5 },
                  mb: { xs: 1.5, sm: 0 },
                }}
              />
              <Box sx={{ alignSelf: "center", ml: 1 }}>
                <Typography color="text.secondary" fontWeight="bold">
                  <Link
                    underline="hover"
                    color="primary"
                    href={item.productUrl}
                  >
                    {item.name}{" "}
                  </Link>
                </Typography>
                <Typography fontWeight="medium" variant="body2">
                  {item.description}
                </Typography>
                <Box
                  sx={(theme) => ({
                    mt: 1,
                    py: 0.4,
                    pl: 0.5,
                    pr: 1,
                    typography: "caption",
                    borderRadius: 10,
                    display: "flex",
                    bgcolor: "primary.50",
                    border: "1px solid",
                    borderColor: "primary.100",
                    color: "primary.700",
                    ...theme.applyDarkStyles({
                      bgcolor: "primaryDark.700",
                      color: "primary.200",
                      borderColor: "primary.900",
                    }),
                  })}
                >
                  <InfoRounded sx={{ fontSize: 16, mr: 0.5, mt: "1px" }} />
                  Status: Available
                </Box>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(item.id)}
                  style={{ marginLeft: "100" }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(item.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          </Card>
        ))}
      </List>
      {error && <p>{error}</p>}
    </Box>
  );
}

export default CardList;