"use client"

import DarkMode from '@/components/menuBar/components/settings/components/DarkMode';
import { Paper1 } from '@/lib/mui/styled';
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Modal, Stack, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import PublisherRequest from './components/PublisherRequest';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelIcon from '@mui/icons-material/Cancel';



export default function Settings({ open, setOpen }) {

    const mobileView = useMediaQuery('(max-width:600px)');

    const [selectedSection, setSelectedSection] = useState(false)

    const handleClose = () => {
        setOpen(false)
        setSelectedSection(false)
    };

    const handleSelect = (componentName, label) => {
        setSelectedSection({ componentName, label })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Paper1 sx={{
                boxShadow: 10,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                maxWidth: "100%",
                outline: "none",
                p: 2
            }}>
                <Stack >
                    <Stack direction="row" justifyContent="center" pb={1} sx={{ position: "relative" }}>
                        <Typography fontSize={20}>Beállítások</Typography>
                        <CancelIcon sx={{ display: mobileView ? "block" : "none", position: "absolute", right: 0, cursor: "pointer" }} onClick={handleClose} />
                    </Stack>

                    <Divider flexItem />
                    <Stack direction="row" sx={{ height: 400, position: "relative" }} >
                        <Box sx={{ height: "100%", width: (mobileView && !selectedSection) ? "100%" : "none", display: (mobileView && selectedSection) ? "none" : "block", zIndex: 1000, }}>
                            <List  >
                                <ListItem disablePadding >
                                    <ListItemButton onClick={() => handleSelect("DarkMode", "Sötét mód")}>
                                        <ListItemText primary="Sötét mód" />
                                        <ArrowForwardIosIcon sx={{ display: mobileView ? "block" : "none" }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding >
                                    <ListItemButton onClick={() => handleSelect("PublisherRequest", "Üzemeltetői kód")}>
                                        <ListItemText primary="Üzemeltetői kód" primaryTypographyProps={{
                                            style: {
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }
                                        }} />
                                        <ArrowForwardIosIcon sx={{ display: mobileView ? "block" : "none" }} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <Stack sx={{ flexGrow: 1, p: 2, display: selectedSection || !mobileView ? "block" : "none" }}>
                            <Stack direction="row" gap={1} sx={{ display: (mobileView && selectedSection) ? "flex" : "none", pb: 3, cursor: "pointer" }} onClick={() => setSelectedSection(false)}>
                                <ArrowBackIcon />
                                <Typography sx={{ fontWeight: 500 }} >{selectedSection.label}:</Typography>
                            </Stack>
                            {selectedSection.componentName === "DarkMode" && <DarkMode />}
                            {selectedSection.componentName === "PublisherRequest" && <PublisherRequest />}
                        </Stack>
                    </Stack>
                </Stack>



            </Paper1>
        </Modal>
    )
}
