import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Edit, Delete } from '@mui/icons-material';

const initialStudents = [
    { id: 1, firstName: 'First1', lastName: 'Last1', studentID: '101', course: 'Course1', email: 'first1.last1@example.com', phone: '111-111-1111' },
    { id: 2, firstName: 'First2', lastName: 'Last2', studentID: '102', course: 'Course2', email: 'first2.last2@example.com', phone: '222-222-2222' },
    { id: 3, firstName: 'First3', lastName: 'Last3', studentID: '103', course: 'Course3', email: 'first3.last3@example.com', phone: '333-333-3333' },
    { id: 4, firstName: 'First4', lastName: 'Last4', studentID: '104', course: 'Course4', email: 'first4.last4@example.com', phone: '444-444-4444' },
    { id: 5, firstName: 'First5', lastName: 'Last5', studentID: '105', course: 'Course5', email: 'first5.last5@example.com', phone: '555-555-5555' },
    { id: 6, firstName: 'First6', lastName: 'Last6', studentID: '106', course: 'Course6', email: 'first6.last6@example.com', phone: '666-666-6666' },
    { id: 7, firstName: 'First7', lastName: 'Last7', studentID: '107', course: 'Course7', email: 'first7.last7@example.com', phone: '777-777-7777' },
    { id: 8, firstName: 'First8', lastName: 'Last8', studentID: '108', course: 'Course8', email: 'first8.last8@example.com', phone: '888-888-8888' },
    { id: 9, firstName: 'First9', lastName: 'Last9', studentID: '109', course: 'Course9', email: 'first9.last9@example.com', phone: '999-999-9999' },
    { id: 10, firstName: 'First10', lastName: 'Last10', studentID: '110', course: 'Course10', email: 'first10.last10@example.com', phone: '000-000-0000' },
    { id: 11, firstName: 'First11', lastName: 'Last11', studentID: '111', course: 'Course11', email: 'first11.last11@example.com', phone: '111-222-3333' },
    { id: 12, firstName: 'First12', lastName: 'Last12', studentID: '112', course: 'Course12', email: 'first12.last12@example.com', phone: '222-333-4444' },
    { id: 13, firstName: 'First13', lastName: 'Last13', studentID: '113', course: 'Course13', email: 'first13.last13@example.com', phone: '333-444-5555' },
    { id: 14, firstName: 'First14', lastName: 'Last14', studentID: '114', course: 'Course14', email: 'first14.last14@example.com', phone: '444-555-6666' },
    { id: 15, firstName: 'First15', lastName: 'Last15', studentID: '115', course: 'Course15', email: 'first15.last15@example.com', phone: '555-666-7777' },
    { id: 16, firstName: 'First16', lastName: 'Last16', studentID: '116', course: 'Course16', email: 'first16.last16@example.com', phone: '666-777-8888' },
    { id: 17, firstName: 'First17', lastName: 'Last17', studentID: '117', course: 'Course17', email: 'first17.last17@example.com', phone: '777-888-9999' },
    { id: 18, firstName: 'First18', lastName: 'Last18', studentID: '118', course: 'Course18', email: 'first18.last18@example.com', phone: '888-999-0000' },
    { id: 19, firstName: 'First19', lastName: 'Last19', studentID: '119', course: 'Course19', email: 'first19.last19@example.com', phone: '999-000-1111' },
    { id: 20, firstName: 'First20', lastName: 'Last20', studentID: '120', course: 'Course20', email: 'first20.last20@example.com', phone: '000-111-2222' },
    { id: 21, firstName: 'First21', lastName: 'Last21', studentID: '121', course: 'Course21', email: 'first21.last21@example.com', phone: '111-222-3333' },
    { id: 22, firstName: 'First22', lastName: 'Last22', studentID: '122', course: 'Course22', email: 'first22.last22@example.com', phone: '222-333-4444' },
    { id: 23, firstName: 'First23', lastName: 'Last23', studentID: '123', course: 'Course23', email: 'first23.last23@example.com', phone: '333-444-5555' },
    { id: 24, firstName: 'First24', lastName: 'Last24', studentID: '124', course: 'Course24', email: 'first24.last24@example.com', phone: '444-555-6666' },
    { id: 25, firstName: 'First25', lastName: 'Last25', studentID: '125', course: 'Course25', email: 'first25.last25@example.com', phone: '555-666-7777' },
];


const StudentTable = () => {
  
    const [students, setStudents] = useState(initialStudents);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState(null);
    const [dialogMode, setDialogMode] = useState('add');
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddStudent = () => {
        setFormData({
            id: students.length + 1, // id for new std
            firstName: '',
            lastName: '',
            studentID: '',
            course: '',
            email: '',
            phone: ''
        });
        setDialogMode('add');
        setOpenDialog(true);
    };

    
    const handleEditStudent = (student) => {
        setFormData(student);
        setDialogMode('edit');
        setOpenDialog(true);
    };

    
    const handleSave = () => {
        if (validateFields()) {
            if (dialogMode === 'add') {
                setStudents([...students, formData]);
            } else if (dialogMode === 'edit') {
                setStudents(students.map(student => (student.id === formData.id ? formData : student)));
            }
            setOpenDialog(false);
        }
    };

   
    const handleDeleteStudent = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    
    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

   // check fields are filed or not
    const validateFields = () => {
        for (const key in formData) {
            if (!formData[key] && key !== 'id') {
                alert(`Please fill in the ${key.replace(/([A-Z])/g, ' $1').trim()}`);
                return false;
            }
        }
        return true;
    };


    const filteredStudents = students.filter(student => 
        student.firstName.toLowerCase().includes(searchQuery) ||
        student.lastName.toLowerCase().includes(searchQuery) ||
        student.studentID.toLowerCase().includes(searchQuery) ||
        student.course.toLowerCase().includes(searchQuery) ||
        student.email.toLowerCase().includes(searchQuery) ||
        student.phone.toLowerCase().includes(searchQuery)
    );

    // DataGrid columns configuration
    const columns = [
        { field: 'firstName', headerName: 'First Name', flex: 1 },
        { field: 'lastName', headerName: 'Last Name', flex: 1 },
        { field: 'studentID', headerName: 'Student ID', flex: 1 },
        { field: 'course', headerName: 'Course', flex: 1 },
        { field: 'email', headerName: 'Email ID', flex: 1 },
        { field: 'phone', headerName: 'Phone Number', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="primary" onClick={() => handleEditStudent(params.row)}>
                        <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteStudent(params.row.id)}>
                        <Delete />
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Segoe UI, Tahoma, sans-serif', fontSize: '2.5rem', fontWeight: '600', mb: 3, color: '#1976d2' }}>
                Student Management Portal
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    onChange={handleSearch}
                    sx={{ bgcolor: '#f5f5f5' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddStudent}
                    startIcon={<Add />}
                >
                    Add Student
                </Button>
            </Box>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={filteredStudents}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    disableSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            fontWeight: '600',
                        },
                        '& .MuiDataGrid-cell': {
                            bgcolor: '#f5f5f5',
                        },
                        '& .MuiDataGrid-cell:hover': {
                            bgcolor: '#e0e0e0',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: '#1976d2',
                            color: '#fff',
                        }
                    }}
                />
            </Box>
            {/* Dialog for Add/Edit */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{dialogMode === 'add' ? 'Add New Student' : 'Edit Student'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData?.firstName || ''}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData?.lastName || ''}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Student ID"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData?.studentID || ''}
                        onChange={(e) => setFormData({ ...formData, studentID: e.target.value })}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Course"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData?.course || ''}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Email ID"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={formData?.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData?.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="error">Cancel</Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        {dialogMode === 'add' ? 'Add Student' : 'Update Student'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default StudentTable;
