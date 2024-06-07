const express = require('express');
const cors = require('cors');
const { sql, poolPromise } = require('./db');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// read customers
app.get('/api/get/customers', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Customers');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// creat customer 
app.post('/api/post/customers', async (req, res) => {
  try {
    const { CusName, PhoneNumber, Password, Image, Status, Point } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('CusName', sql.VarChar, CusName)
      .input('PhoneNumber', sql.VarChar, PhoneNumber)
      .input('Password', sql.VarChar, Password)
      .input('Image', sql.VarChar, Image)
      .input('Status', sql.Int, Status)
      .input('Point', sql.Int, Point)
      .query('INSERT INTO Customers (CusName, PhoneNumber, Password, Image, Status, Point) VALUES (@CusName, @PhoneNumber, @Password, @Image, @Status, @Point)');
    res.status(201).send({ message: 'Customer created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Đường dẫn mới cho API đăng nhập
app.post('/api/post/login', async (req, res) => {
  try {
    console.log('Login request received');
    const { PhoneNumber, Password } = req.body;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('PhoneNumber', sql.VarChar, PhoneNumber)
      .input('Password', sql.VarChar, Password)
      .query('SELECT * FROM Customers WHERE PhoneNumber = @PhoneNumber AND Password = @Password');

    if (result.recordset.length > 0) {
      const customer = result.recordset[0];
      console.log('Login successful');
      console.log('CustomerID:', customer.CustomerID)
      res.status(200).send({
        message: 'Login successful',
        customerId: customer.CustomerID // Trả về customerId
      });
    } else {
      console.log('Invalid phone number or password');
      res.status(401).send({ message: 'Invalid phone number or password' });
    }
  } catch (err) {
    console.log('Error:', err.message);
    res.status(500).send({ message: err.message });
  }
});

// update customer
app.put('/api/put/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { CusName, PhoneNumber, Password, Image, Status, Point } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('CusName', sql.VarChar, CusName)
      .input('PhoneNumber', sql.VarChar, PhoneNumber)
      .input('Password', sql.VarChar, Password)
      .input('Image', sql.VarChar, Image)
      .input('Status', sql.Int, Status)
      .input('Point', sql.Int, Point)
      .input('CustomerId', sql.Int, id)
      .query('UPDATE Customers SET CusName = @CusName, PhoneNumber = @PhoneNumber, Password = @Password, Image = @Image, Status = @Status, Point = @Point WHERE CustomerId = @CustomerId');
    res.status(200).send({ message: 'Customer updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// delete customer
app.delete('/api/delete/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('CustomerId', sql.Int, id)
      .query('DELETE FROM Customers WHERE CustomerId = @CustomerId');
    res.status(200).send({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// CRUD cho bảng Employees
// Create
app.post('/api/post/employees', async (req, res) => {
  try {
    const { EmName, Address, Email, PhoneNumber, Password, DateOfBirth, Gender } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('EmName', sql.VarChar, EmName)
      .input('Address', sql.VarChar, Address)
      .input('Email', sql.VarChar, Email)
      .input('PhoneNumber', sql.VarChar, PhoneNumber)
      .input('Password', sql.VarChar, Password)
      .input('DateOfBirth', sql.Date, DateOfBirth)
      .input('Gender', sql.VarChar, Gender)
      .query('INSERT INTO Employee (EmName, Address, Email, PhoneNumber, Password, DateOfBirth, Gender) VALUES (@EmName, @Address, @Email, @PhoneNumber, @Password, @DateOfBirth, @Gender)');
    res.status(201).send({ message: 'Employee created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Read
app.get('/api/get/employees', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Employee');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Update
app.put('/api/put/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { EmName, Address, Email, PhoneNumber, Password, DateOfBirth, Gender } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('EmployeeID', sql.Int, id)
      .input('EmName', sql.VarChar, EmName)
      .input('Address', sql.VarChar, Address)
      .input('Email', sql.VarChar, Email)
      .input('PhoneNumber', sql.VarChar, PhoneNumber)
      .input('Password', sql.VarChar, Password)
      .input('DateOfBirth', sql.Date, DateOfBirth)
      .input('Gender', sql.VarChar, Gender)
      .query('UPDATE Employee SET EmName = @EmName, Address = @Address, Email = @Email, PhoneNumber = @PhoneNumber, Password = @Password, DateOfBirth = @DateOfBirth, Gender = @Gender WHERE EmployeeID = @EmployeeID');
    res.status(200).send({ message: 'Employee updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Delete
app.delete('/api/delete/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('EmployeeID', sql.Int, id)
      .query('DELETE FROM Employee WHERE EmployeeID = @EmployeeID');
    res.status(200).send({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// CRUD cho bảng Trainers
// Create
app.post('/api/post/trainers', async (req, res) => {
  try {
    const { TrainerName, PhoneNumber, Password, Address, Email, DateOfBirth, Gender, Image, Cost, Salary } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('TrainerName', sql.VarChar, TrainerName)
      .input('PhoneNumber', sql.VarChar, PhoneNumber)
      .input('Password', sql.VarChar, Password)
      .input('Address', sql.VarChar, Address)
      .input('Email', sql.VarChar, Email)
      .input('DateOfBirth', sql.Date, DateOfBirth)
      .input('Gender', sql.VarChar, Gender)
      .input('Image', sql.VarChar, Image)
      .input('Cost', sql.Decimal, Cost)
      .input('Salary', sql.Decimal, Salary)
      .query('INSERT INTO Trainers (TrainerName, PhoneNumber, Password, Address, Email, DateOfBirth, Gender, Image, Cost, Salary) VALUES (@TrainerName, @PhoneNumber, @Password, @Address, @Email, @DateOfBirth, @Gender, @Image, @Cost, @Salary)');
    res.status(201).send({ message: 'Trainer created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Read
app.get('/api/get/trainers', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Trainers');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Update
app.put('/api/put/trainers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { TrainerName, PhoneNumber, Password, Address, Email, DateOfBirth, Gender, Image, Cost, Salary } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('TrainerID', sql.Int, id)
      .input('TrainerName', sql.VarChar, TrainerName)
      .input('PhoneNumber', sql.VarChar, PhoneNumber)
      .input('Password', sql.VarChar, Password)
      .input('Address', sql.VarChar, Address)
      .input('Email', sql.VarChar, Email)
      .input('DateOfBirth', sql.Date, DateOfBirth)
      .input('Gender', sql.VarChar, Gender)
      .input('Image', sql.VarChar, Image)
      .input('Cost', sql.Decimal, Cost)
      .input('Salary', sql.Decimal, Salary)
      .query('UPDATE Trainers SET TrainerName = @TrainerName, PhoneNumber = @PhoneNumber, Password = @Password, Address = @Address, Email = @Email, DateOfBirth = @DateOfBirth, Gender = @Gender, Image = @Image, Cost = @Cost, Salary = @Salary WHERE TrainerID = @TrainerID');
    res.status(200).send({ message: 'Trainer updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Delete
app.delete('/api/delete/trainers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('TrainerID', sql.Int, id)
      .query('DELETE FROM Trainers WHERE TrainerID = @TrainerID');
    res.status(200).send({ message: 'Trainer deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// CRUD cho bảng MonthlySubscriptions
// Create
app.post('/api/post/monthly-subscriptions', async (req, res) => {
  try {
    const { Name, Cost, Duration } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('Name', sql.VarChar, Name)
      .input('Cost', sql.Decimal, Cost)
      .input('Duration', sql.Int, Duration)
      .query('INSERT INTO MonthlySubscriptions (Name, Cost, Duration) VALUES (@Name, @Cost, @Duration)');
    res.status(201).send({ message: 'Monthly subscription created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Read
app.get('/api/get/monthly-subscriptions', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM MonthlySubscriptions');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Update
app.put('/api/put/monthly-subscriptions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Cost, Duration } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('MonthlySubscriptionID', sql.Int, id)
      .input('Name', sql.VarChar, Name)
      .input('Cost', sql.Decimal, Cost)
      .input('Duration', sql.Int, Duration)
      .query('UPDATE MonthlySubscriptions SET Name = @Name, Cost = @Cost, Duration = @Duration WHERE MonthlySubscriptionID = @MonthlySubscriptionID');
    res.status(200).send({ message: 'Monthly subscription updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Delete
app.delete('/api/delete/monthly-subscriptions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('MonthlySubscriptionID', sql.Int, id)
      .query('DELETE FROM MonthlySubscriptions WHERE MonthlySubscriptionID = @MonthlySubscriptionID');
    res.status(200).send({ message: 'Monthly subscription deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// CRUD cho bảng SessionSubscriptions
// Create
app.post('/api/post/session-subscriptions', async (req, res) => {
  try {
    const { Name, Cost, NumberOfSessions } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('Name', sql.VarChar, Name)
      .input('Cost', sql.Decimal, Cost)
      .input('NumberOfSessions', sql.Int, NumberOfSessions)
      .query('INSERT INTO SessionSubscriptions (Name, Cost, NumberOfSessions) VALUES (@Name, @Cost, @NumberOfSessions)');
    res.status(201).send({ message: 'Session subscription created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Read
app.get('/api/get/session-subscriptions', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM SessionSubscriptions');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Update
app.put('/api/put/session-subscriptions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Cost, NumberOfSessions } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('SessionSubscriptionID', sql.Int, id)
      .input('Name', sql.VarChar, Name)
      .input('Cost', sql.Decimal, Cost)
      .input('NumberOfSessions', sql.Int, NumberOfSessions)
      .query('UPDATE SessionSubscriptions SET Name = @Name, Cost = @Cost, NumberOfSessions = @NumberOfSessions WHERE SessionSubscriptionID = @SessionSubscriptionID');
    res.status(200).send({ message: 'Session subscription updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Delete
app.delete('/api/delete/session-subscriptions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('SessionSubscriptionID', sql.Int, id)
      .query('DELETE FROM SessionSubscriptions WHERE SessionSubscriptionID = @SessionSubscriptionID');
    res.status(200).send({ message: 'Session subscription deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
// CRUD cho bảng Bill
// Create
app.post('/api/post/Bill', async (req, res) => {
  try {
    const { CustomerID, EmployeeID, TrainerID, MonthlySubscriptionID, SessionSubscriptionID, TotalBill, StartDate, EndDate } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('CustomerID', sql.Int, CustomerID)
      .input('EmployeeID', sql.Int, EmployeeID)
      .input('TrainerID', sql.Int, TrainerID)
      .input('MonthlySubscriptionID', sql.Int, MonthlySubscriptionID)
      .input('SessionSubscriptionID', sql.Int, SessionSubscriptionID)
      .input('TotalBill', sql.Decimal, TotalBill)
      .input('StartDate', sql.Date, StartDate)
      .input('EndDate', sql.Date, EndDate)
      .query('INSERT INTO Bills (CustomerID, EmployeeID, TrainerID, MonthlySubscriptionID, SessionSubscriptionID, TotalBill, StartDate, EndDate) VALUES (@CustomerID, @EmployeeID, @TrainerID, @MonthlySubscriptionID, @SessionSubscriptionID, @TotalBill, @StartDate, @EndDate)');
    res.status(201).send({ message: 'Bill created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
app.get('/api/get/customerBills/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('CustomerId', sql.Int, customerId)
      .query('SELECT * FROM Bills WHERE CustomerId = @CustomerId');

    if (result.recordset.length > 0) {
      res.status(200).send(result.recordset);
    } else {
      res.status(404).send({ message: 'No bills found for this customer' });
    }
  } catch (err) {
    console.log('Error:', err.message);
    res.status(500).send({ message: err.message });
  }
});
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
