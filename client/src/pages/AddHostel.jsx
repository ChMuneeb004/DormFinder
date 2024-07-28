import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../dashbordComp/Sidebar';
import '../css_folder/AddHostel.css';
import { AuthContext } from '../contexts/AuthContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import MapComponent from './MapComponent';


const Popup = ({ message, onClose }) => (
  <div className="popup">
    <div className="popup-inner">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

const AddHostel = () => {
  const { auth } = useContext(AuthContext);
  const [hostel, setHostel] = useState({
    name: '',
    location: '',
    description: '',
    images: [],
    roomImages: [],
    number_of_rooms: '',
    contact: '',
    hostel_type: '',
    latitude: null,
    longitude: null,
    rooms: [
      { type: 'double', price: '', availability: false },
      { type: 'triple', price: '', availability: false },
      { type: 'quadruple', price: '', availability: false },
    ],
    amenities: {
      air_condition_check: false,
      air_cooler_check: false,
      kitchen_check: false,
      gasoline_check: false,
      water_cooler_check: false,
      attached_bathroom_check: false
    }
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { id, value, files, type, checked, name } = e.target;
    if (files) {
      setHostel({
        ...hostel,
        [id]: Array.from(files),
      });
    } else if (type === 'checkbox') {
      if (name.startsWith('room')) {
        const index = parseInt(name.split('-')[1], 10);
        setHostel(prevState => ({
          ...prevState,
          rooms: prevState.rooms.map((room, i) =>
            i === index ? { ...room, availability: checked } : room
          )
        }));
      } else {
        setHostel(prevState => ({
          ...prevState,
          amenities: {
            ...prevState.amenities,
            [id]: checked
          }
        }));
      }
    } else if (name.startsWith('room')) {
      const index = parseInt(name.split('-')[1], 10);
      const field = name.split('-')[2];
      setHostel(prevState => ({
        ...prevState,
        rooms: prevState.rooms.map((room, i) =>
          i === index ? { ...room, [field]: value } : room
        )
      }));
    } else {
      setHostel(prevState => ({
        ...prevState,
        [id]: value
      }));
    }
  };

  const handlePhoneChange = (value) => {
    setHostel(prevState => ({
      ...prevState,
      contact: value
    }));
  };

  const validateForm = () => {
    let messages = [];
    if (!hostel.name.trim()) {
      messages.push('Please enter your hostel name.');
    }
    if (!hostel.location.trim()) {
      messages.push('Please enter the hostel location.');
    }
    if (hostel.location.length < 5) {
      messages.push('Please enter a correct hostel location.');
    }
    if (!hostel.description.trim()) {
      messages.push('Please enter a description.');
    }
    if (hostel.description.length < 50) {
      messages.push('Description must be at least 50 characters.');
    }
    if (!hostel.number_of_rooms || isNaN(hostel.number_of_rooms) || hostel.number_of_rooms <= 0) {
      messages.push('Please enter a valid number of rooms.');
    }
    if (!hostel.contact || !/^(\+?\d{1,4}|\d{1,4})?\s?\d{10,14}$/.test(hostel.contact)) {
      messages.push('Please enter a valid contact number.');
    }
    if (hostel.images.length === 0) {
      messages.push('Please upload at least one image of the hostel.');
    }
    if (hostel.roomImages.length === 0) {
      messages.push('Please upload at least one image of the rooms.');
    }
    if (!hostel.hostel_type) { // Added validation for hostel_type
      messages.push('Please select a hostel type.');
    }
    hostel.rooms.forEach((room, index) => {
      if (room.availability && (!room.price || isNaN(room.price) || room.price <= 0)) {
        messages.push(`Please enter a valid price for the ${room.type} room.`);
      }
    });
    return messages;
  };
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMessages = validateForm();
    if (validationMessages.length > 0) {
      setPopupMessage(validationMessages.join(' '));
      setShowPopup(true);
      return;
    }

    // const stitchedRoomImages = await stitchRoomImages();

    const formData = new FormData();
    formData.append('name', hostel.name);
    formData.append('location', hostel.location);
    formData.append('description', hostel.description);
    formData.append('number_of_rooms', hostel.number_of_rooms);
    formData.append('contact', hostel.contact);
    formData.append('rooms', JSON.stringify(hostel.rooms));
    formData.append('amenities', JSON.stringify(hostel.amenities));
    // formData.append('stitchedRoomImages', JSON.stringify(stitchedRoomImages))
    formData.append('hostel_type', hostel.hostel_type);

    for (const image of hostel.images) {
      formData.append('images', image);
    }

    for (const roomImages of hostel.roomImages) {
      formData.append('roomImages', roomImages);
      
    }
    
  

    try {
      
      const hostelResponse = await axios.post("http://localhost:3001/listHostel", formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const hostelId = hostelResponse.data._id;

      // const stitchFormData = new FormData();
      // stitchFormData.append('hostelId', hostelId);
      // for (const roomImage of hostel.roomImages) {
      //   stitchFormData.append('roomImages', roomImage);
      // }

      // const stitchResponse = await axios.post("http://localhost:3001/stitch-room-images", stitchFormData, {
      //   headers: {
      //     Authorization: `Bearer ${auth.token}`,
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      // Stitch Room Images
      // await axios.post("http://localhost:3001/stitch-room-images", {
      //   hostelId,
      //   roomImages: hostel.roomImages
      // }, {
      //   headers: {
      //     Authorization: `Bearer ${auth.token}`,
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      // console.log('Stitched Room Images Response:', stitchResponse.data);
      // .then(response => {
      //   console.log('Stitched image URL:', response.data.stitchedRoomImages);
      // })
      // .catch(error => {
      //   console.error('Error uploading images:', error);
      // });


      // Create Rooms
      await axios.post("http://localhost:3001/listRooms", {
        rooms: JSON.stringify(hostel.rooms),
        hostelId
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      // Create Amenities
      await axios.post("http://localhost:3001/listAmenities", {
        amenities: JSON.stringify(hostel.amenities),
        hostelId
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      setPopupMessage('Hostel, rooms, and amenities added successfully.');
      setShowPopup(true);
      setHostel({
        name: '',
        location: '',
        description: '',
        images: [],
        roomImages: [],
        number_of_rooms: '',
        contact: '',
        hostel_type: '',
        latitude: null,
        longitude: null,
        rooms: [
          { type: 'double', price: '', availability: false },
          { type: 'triple', price: '', availability: false },
          { type: 'quadruple', price: '', availability: false },
        ],
        amenities: {
          air_condition_check: false,
          air_cooler_check: false,
          kitchen_check: false,
          gasoline_check: false,
          water_cooler_check: false,
          attached_bathroom_check: false
        }
      });
    } catch (error) {
      setPopupMessage('There was an error adding the hostel!');
      setShowPopup(true);
    }
  };

  // const stitchRoomImages = async () => {
  //   try {
  //     debugger;
  //     const hostelId = hostelResponse.data._id;
  //     const formData = new FormData();
  //     formData.append('hostelId', hostelId); // Assuming hostel.id contains the hostelId
  //     for (const roomImages of hostel.roomImages) {
  //       formData.append('roomImages', roomImages);
  //     }

  //     const response = await axios.post("http://localhost:3001/stitch-room-images", formData, {
  //       headers: {
  //         Authorization: `Bearer ${auth.token}`,
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });

  //     return response.data.stitchedRoomImages;
  //   } catch (error) {
  //     setPopupMessage('Error stitching room images!');
  //     setShowPopup(true);
  //     return [];
  //   }
  // };

  const handleCustomButtonClick = () => {
    document.getElementById('images').click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setHostel(prevState => ({
      ...prevState,
      images: files
    }));
  };

  const handleRoomImageChange = (e) => {
    const files = Array.from(e.target.files);
    setHostel(prevState => ({
      ...prevState,
      roomImages: files
    }));
  };

  const handleCustomButtonClick1 = () => {
    document.getElementById('roomImages').click();
  };

  // const handleMarkerDragEnd = (position) => {
  //   setHostel(prevState => ({
  //     ...prevState,
  //     latitude: position.lat,
  //     longitude: position.lng,
  //     location: `${position.lat}, ${position.lng}`

  //   }));
  // };

  return (
    <div className="d-flex">
      <Container fluid>
        <Row>
          <Col xs={0} sm={0} md={4} lg={3} xl={3}>
            <Sidebar />
          </Col>
          <Col xs={12} sm={12} md={8} lg={9} xl={9}>
            <div className='p-4'>
              <h1 className="mb-4">Add Hostel</h1>
              {alert.show && <Alert variant={alert.variant} onClose={() => setAlert({ show: false, message: '', variant: '' })} dismissible>{alert.message}</Alert>}
              <Form className="add-hostel-form container" onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Text className="text-muted">
                        Enter your Hostel name
                      </Form.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter your Hostel name"
                        value={hostel.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="location">
                      <Form.Text className="text-muted">
                        Enter Hostel location
                      </Form.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter Hostel location"
                        value={hostel.location}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* <Row>
                  <Col>
                    <MapComponent onMarkerDragEnd={handleMarkerDragEnd} />
                  </Col>
                </Row> */}
                <Form.Group controlId="description">
                  <Form.Text className="text-muted">
                    Provide a brief description of the hostel (at least 50 characters)
                  </Form.Text>
                  <Form.Control
                    as="textarea"
                    placeholder="Your text goes here"
                    value={hostel.description}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', height: '150px' }}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="number_of_rooms">
                      <Form.Text className="text-muted">
                        Number of Rooms
                      </Form.Text>
                      <Form.Control
                        type="number"
                        placeholder="Number of Rooms"
                        value={hostel.number_of_rooms}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="contact">
                      <Form.Text className="text-muted">
                        Enter your Hostel contact number
                      </Form.Text>
                      <PhoneInput
                        country={'pk'}
                        value={hostel.contact}
                        onChange={handlePhoneChange}
                        inputStyle={{ width: '100%' }}
                        inputProps={{
                          required: true,
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="hostel_type">
                      <Form.Text className="text-muted">
                        Hostel Type
                      </Form.Text>
                        <Form.Control
                          as="select"
                          id="hostel_type"
                          value={hostel.hostel_type}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Hostel Type</option>
                          <option value="Boys">Boys Hostel</option>
                          <option value="Girls">Girls Hostel</option>
                        </Form.Control>
                      </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="images">
                  <Card className="mb-3">
                    <Card.Body>
                      <Form.Label>Hostel Images</Form.Label>
                      <Form.Control
                        type="file"
                        id="images"
                        style={{ display: 'none' }}
                        multiple
                        onChange={handleImageChange}
                        required
                      />
                      <Button className="btn btn-primary text-white" variant="warning" onClick={handleCustomButtonClick}>
                        Upload Images
                      </Button>
                      {hostel.images.length > 0 && (
                        <div className="mt-2">
                          {hostel.images.map((file, index) => (
                            <div key={index}>{file.name}</div>
                          ))}
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Form.Group>

                <Form.Group controlId="roomImages">
                  <Card className="mb-3">
                    <Card.Body>
                      <Form.Label>Room Images</Form.Label>
                      <Form.Control
                        type="file"
                        id="roomImages"
                        style={{ display: 'none' }}
                        multiple
                        onChange={handleRoomImageChange}
                        required
                      />
                      <Button className="btn btn-primary text-white" variant="warning" onClick={handleCustomButtonClick1}>
                        Upload Room Images
                      </Button>

                      {hostel.roomImages.length > 0 && (
                        <div className="mt-2">
                          {hostel.roomImages.map((file, index) => (
                            <div key={index}>{file.name}</div>
                          ))}
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Form.Group>

                <Form.Group>
                  <Form.Text className="text-muted">
                    Room Types
                  </Form.Text>
                  {hostel.rooms.map((room, index) => (
                    <Card key={index} className="mb-3">
                      <Card.Body>
                        <Form.Check
                          type="checkbox"
                          label={`${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room`}
                          name={`room-${index}`}
                          checked={room.availability}
                          onChange={handleChange}
                        />
                        {room.availability && (
                          <Form.Control
                            type="number"
                            placeholder="Enter price"
                            name={`room-${index}-price`}
                            value={room.price}
                            onChange={handleChange}
                            required
                          />
                        )}
                      </Card.Body>
                    </Card>
                  ))}
                </Form.Group>

                <Form.Group>
                  <Form.Text className="text-muted">
                    Amenities
                  </Form.Text>
                  <Row>
                    {Object.keys(hostel.amenities).map((amenity, index) => (
                      <Col xs={6} md={4} key={index}>
                        <Form.Check
                          type="checkbox"
                          label={amenity.replace(/_/g, ' ').replace(/check/, '').replace(/^\w/, (c) => c.toUpperCase())}
                          id={amenity}
                          checked={hostel.amenities[amenity]}
                          onChange={handleChange}
                        />
                      </Col>
                    ))}
                  </Row>
                </Form.Group>

                <Button className="btn btn-primary text-white" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default AddHostel;
