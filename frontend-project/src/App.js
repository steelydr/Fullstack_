import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUserComponent from './components/AddUserComponent';
import AllUsersComponent from './components/AllUsersComponent'; 
import Homepage from './components/HomePage'; 
import AddRoleComponent from './components/AddRolesComponent'; 
import AddAdminComponent from './components/AddAdminComponent';
import AllAdminComponent from './components/AllAdminComponent';
import AddSportsComponent from './components/AddSportsComponent';
import AllRolesComponent from './components/AllRolesComponent';
import AllVenuesComponent from './components/AllVenuesComponent';
import AllPaymentTypeComponent from './components/AllPaymentTypeComponent';
import AddPaymentTypeComponent from './components/AddPaymentTypeComponent';
import AddBookingTypeComponent from './components/AddBookingTypeComponent';
import AllBookingTypeComponent from './components/AllBookingTypeComponent';
import AllSportsComponent from './components/AllSportsComponent';
import AddVenueComponent from './components/AddVenueComponent';
import AddMovieComponent from './components/AddMovieComponent';
import AddArtistComponent from './components/AddArtistComponent';
import AddAgeRestrictionComponent from './components/AddAgeRestrictionComponent';
import AllAgeRestrictionComponent from './components/AllAgeRestrictionComponent';
import AllArtistComponent from './components/AllArtistComponent';
import AllConcertComponent from './components/AllConcertComponent';
import AddConcertComponent from './components/AddConcertComponent';
import AllGameComponent from './components/AllGameComponent';
import AddGameComponent from './components/AddGameComponent';
import Home from './components/Home';
import Concerts from './components/Concerts';
import Games from './components/Games';
import AllRatingComponent from './components/AllRatingComponent';
import AddRatingComponent from './components/AddRatingComponent';
import Movies from './components/Movies';
import UpdateMovies from './components/UpdateMovies';
import PaymentComponent from './components/PaymentComponent';
import AllBooking from './components/AllBooking';
import AllPayment from './components/AllPayment';
import Bookingspree from './components/Bookingspree'

import Moviemanagerdash from './components/Moviemanagerdash'
import Gamemanagerdash from './components/Gamemanagerdash'
import VenueManagerDash from './components/VenueManagerDash'
import ConcertManagerDash from './components/ConcertManagerDash'
import ArtistManagerDash from './components/ArtistManagerDash'
import BookingManagerDash from './components/BookingManagerDash'
import PaymentManagerDash from './components/PaymentManagerDash'

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* User login and register pages */}
          <Route path="/" element={<Bookingspree />} />
          <Route path="/register" element={<AddUserComponent />} />
          <Route path="/user/:userId" element={<Homepage />} />
          
          <Route path="/user/:userId/home" element={<Home />} />
          <Route path="/user/:userId/home/b/3/:concertId" element={<Concerts />} />
          <Route path="/user/:userId/home/b/2/:gameId" element={<Games />} />
          <Route path="/user/:userId/home/b/1/:movieId" element={<Movies />} />
          
          <Route path="/user/:userId/home/b/3/:concertId/:bookingId" element={<PaymentComponent />} />
          <Route path="/user/:userId/home/b/1/:movieId/:bookingId" element={<PaymentComponent />} />
          <Route path="/user/:userId/home/b/2/:gameId/:bookingId" element={<PaymentComponent />} />
          
          {/**Admin Routes for OLAP Queries */}
          
          <Route path="/admin" element={<AddAdminComponent />} />
          <Route path="/admin/all" element={<AllAdminComponent />} />
          
          <Route path="/admin/:adminId/1" element={<Moviemanagerdash/>} />
          
          
          <Route path="/admin/:adminId/2" element={<Gamemanagerdash/>} />
          <Route path="/admin/:adminId/4" element={<ConcertManagerDash/>} />

          <Route path="/admin/:adminId/5" element={<ArtistManagerDash/>} />
          <Route path="/admin/:adminId/6" element={<VenueManagerDash/>} />
          
          <Route path="/admin/:adminId/8" element={<BookingManagerDash/>} />
          <Route path="/admin/:adminId/9" element={<PaymentManagerDash/>} />

          <Route path="/user/all-users/" element={<AllUsersComponent />} /> 

          {/** Rating Table */}
          <Route path="/r" element={<AllRatingComponent/>} />
          <Route path="/r/add" element={<AddRatingComponent/>} />
          <Route path="/b" element={<AllBooking/>} />
          <Route path="/p" element={<AllPayment/>} />

          {/** Roles Table */}
          <Route path="/roles" element={<AddRoleComponent />} />
          <Route path="/roles/all/" element={<AllRolesComponent />} /> 

          {/** Venue Table */}
          <Route path="/venues" element={<AddVenueComponent />} /> 
          <Route path="/venue/all/" element={<AllVenuesComponent />} /> 

          {/** Sports Table */}
          <Route path="/add-sports" element={<AddSportsComponent />} /> 
          <Route path="/sports/all/" element={<AllSportsComponent />} />
          
          {/** Artist Table */}
          <Route path="/add-artist" element={<AddArtistComponent />} />
          <Route path="/artist/all/" element={<AllArtistComponent />} />

          {/** Payment Table */}
          <Route path="/add-payment-type" element={<AddPaymentTypeComponent />} />
          <Route path="/paymenttype/all/" element={<AllPaymentTypeComponent />} />

          {/** Age Restriction Table */}
          <Route path="/add-age-restriction" element={<AddAgeRestrictionComponent />} />
          <Route path="/age-restriction/all" element={<AllAgeRestrictionComponent />} />

          {/** Booking Type Table */}
          <Route path="/add-booking-type" element={<AddBookingTypeComponent />} />
          <Route path="/bookingtype/all" element={<AllBookingTypeComponent />} />

          {/** Concerts Table */}
          <Route path="/concerts/all" element={<AllConcertComponent />} />
          <Route path="/add-concert" element={<AddConcertComponent />} />

          {/** Movies Table */}
          <Route path="/add-movie" element={<AddMovieComponent />} />
          <Route path="/movies/:movieId" element={<UpdateMovies />} />

          {/** Game Table */}
          <Route path="/game/all" element={<AllGameComponent />} />
          <Route path="/add-game" element={<AddGameComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;