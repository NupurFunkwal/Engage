import { Button, Checkbox, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import React, { useState } from 'react'
import { useLocalContext } from '../../context/context';
import Form from './Form';
import './style.css'

const CreateCourse = () => {
    const {createCourseDialog, setCreateCourseDialog} = useLocalContext();
    const [check, setChecked] = useState(false);
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <Dialog
                onClose={()=> setCreateCourseDialog(false)}
                aria-labelledby="customized-dialog-title"
                open={createCourseDialog}
                maxWidth={showForm ? 'lg':'xs'}
                className ="form_dialog"
            >
                {showForm ? (
                    <Form/>
                ):( <>
                    <div className="course_title">
                        Using Photon for studying with friends?
                    </div>
                    <DialogContent className="course_content">
                        <p className="course_text">
                            <p>
                                If so, sign up for a free account before you use Photon
                            </p>
                        </p>
                        
                        <div className="course_checkboxWrapper">
                            <Checkbox onChange={() => setChecked(!check)}/>
                            <p>
                                I have read and understood the above message
                            </p>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => setCreateCourseDialog(false)}>
                            Close
                        </Button>
                        <Button autoFocus disabled={!check}
                        onClick={() => setShowForm(true)}>
                            Continue
                        </Button>
                    </DialogActions>
                    </>
                )}
            
            </Dialog>
        </div>
    );
};

export default CreateCourse;
