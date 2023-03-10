import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import serverLinks from '../js/serverLinks';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FileViewer({ fileName, serviceName, replace = null, children }) {


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            {
                !children ? <Button onClick={handleClickOpen}
                    sx={{ textTransform: "none", border: 'none', color: `${serviceName === 'AAA' ? 'green' : 'blue'}`, outline: 'none', backgroundColor: '#d2ebff' }}>
                    {replace ? fileName.replace(replace.target, replace.with) : serviceName === "AAA" ? fileName : 'View File'}
                </Button> : <div onClick={handleClickOpen}>
                    {children}
                </div>
            }
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div className='border-b-2'>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            size="small"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1, fontSize: 15 }} component="div">
                            File Viewer - {replace ? fileName.replace(replace.target, replace.with) : fileName}
                        </Typography>
                    </Toolbar>

                </div>
                <div>
                    {
                        fileName ?

                            <>
                                {fileName ?

                                    <>

                                        {/* // Your fileName div */}
                                        <div className="w-full my-3">
                                            {
                                                fileName?.endsWith('.pdf')

                                                    ?

                                                    <iframe src={serverLinks.showFile(fileName, serviceName)} className="rounded mx-auto w-full h-1/3 sm:h-screen sm:w-1/2 " alt="fileName" />
                                                    :

                                                    <img
                                                        src={serverLinks.showFile(fileName, serviceName)} className="rounded-xl mx-auto w-full h-1/2 sm:h-screen sm:w-1/2 border-4 border-gray-500 img-responsive object-contain" alt="" />
                                            }

                                        </div>

                                    </>

                                    :
                                    'Loading...'
                                }
                            </>

                            :

                            <div className="flex flex-col items-center justify-center">
                                <img src={`/assets/filenotfound.svg`} className="rounded-xl mx-auto w-96 img-responsive" alt="" />
                                <p className="text-xl text-gray-500">The file you're looking for is not available</p>
                            </div>
                    }
                </div>
            </Dialog>
        </div>
    );
}
