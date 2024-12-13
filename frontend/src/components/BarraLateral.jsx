import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link } from 'react-router-dom';

export default function BarraLateral({ imputados, onSubSelected, archivosDisposiciones, archivosImputados }) {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [subOpenProvidencia, setSubOpenProvidencia] = React.useState(false);
  const [subOpenDisposiciones, setSubOpenDisposiciones] = React.useState(false);
  const [subOpenRequerimientos, setSubOpenRequerimientos] = React.useState(false);

  const [selectedSub, setSelectedSub] = React.useState(null); // Estado para la subcarpeta seleccionada
  const [openImputados, setOpenImputados] = React.useState(
    imputados.map(() => false) // Estado para controlar el colapso de cada subcarpeta de imputado
  );

  const archivosFiltradosDisposiciones = archivosDisposiciones.filter((archivo) => archivo.tipo === 'Disposiciones');
  const archivosFiltradosRequerimientos = archivosDisposiciones.filter((archivo) => archivo.tipo === 'Requerimientos');
  const archivosFiltradosProvidencia = archivosDisposiciones.filter((archivo) => archivo.tipo === 'Providencia');

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleSubClickProvidencia = () => {
    setSubOpenProvidencia(!subOpenProvidencia);
    setSelectedSub('Providencia');
    onSubSelected('Providencia');
  };

  const handleSubClickDisposiciones = () => {
    setSubOpenDisposiciones(!subOpenDisposiciones);
    setSelectedSub('Disposiciones');
    onSubSelected('Disposiciones');
  };

  const handleSubClickRequerimientos = () => {
    setSubOpenRequerimientos(!subOpenRequerimientos);
    setSelectedSub('Requerimientos');
    onSubSelected('Requerimientos');
  };

  const toggleImputadoCollapse = (index, imputado) => {
    const newOpenStates = [...openImputados];
    newOpenStates[index] = !newOpenStates[index];
    setOpenImputados(newOpenStates);
    setSelectedSub(imputado.nombres + ' ' + imputado.apellidos); // Marca como seleccionada la subcarpeta
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'transparent',
        color: 'white',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{
            bgcolor: 'transparent',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        >
          Lista de Carpetas
        </ListSubheader>
      }
    >
      {/* Primera Carpeta */}
      <ListItemButton onClick={handleClick1}>
        <ListItemIcon sx={{ color: 'white' }}>
          {open1 ? <FolderOpenIcon /> : <FolderIcon />}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="caption">
              Disposiciones Fiscales
            </Typography>
          }
          sx={{ color: 'white' }}
        />
        {open1 ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
      </ListItemButton>

      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Subcarpeta Providencia */}
          <ListItemButton
            sx={{
              pl: 4,
              bgcolor: selectedSub === 'Providencia' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            }}
            onClick={handleSubClickProvidencia}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              {subOpenProvidencia ? <FolderOpenIcon /> : <FolderIcon />}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="caption"
                  sx={{ fontWeight: selectedSub === 'Providencia' ? 'bold' : 'normal' }}
                >
                  Providencia
                </Typography>
              }
              sx={{ color: 'white' }}
            />
            {subOpenProvidencia ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
          </ListItemButton>

          <Collapse in={subOpenProvidencia} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {archivosFiltradosProvidencia.map((archivo) => (
                <Link to={archivo.archivo} target='__blank' key={archivo.id}>
                  <ListItemButton sx={{ pl: 8 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <PictureAsPdfIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="caption">
                          {archivo.nombre}.pdf
                        </Typography>
                      }
                      sx={{ color: 'white' }}
                    />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
          {/* Subcarpeta Disposiciones */}
          <ListItemButton
            sx={{
              pl: 4,
              bgcolor: selectedSub === 'Disposiciones' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            }}
            onClick={handleSubClickDisposiciones}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              {subOpenDisposiciones ? <FolderOpenIcon /> : <FolderIcon />}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="caption"
                  sx={{ fontWeight: selectedSub === 'Disposiciones' ? 'bold' : 'normal' }}
                >
                  Disposiciones
                </Typography>
              }
              sx={{ color: 'white' }}
            />
            {subOpenDisposiciones ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
          </ListItemButton>

          <Collapse in={subOpenDisposiciones} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {archivosFiltradosDisposiciones.map((archivo) => (
                <Link to={archivo.archivo} target='__blank' key={archivo.id}>
                  <ListItemButton sx={{ pl: 8 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <PictureAsPdfIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="caption">
                          {archivo.nombre}.pdf
                        </Typography>
                      }
                      sx={{ color: 'white' }}
                    />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
          {/* Subcarpeta Requerimientos */}
          <ListItemButton
            sx={{
              pl: 4,
              bgcolor: selectedSub === 'Requerimientos' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            }}
            onClick={handleSubClickRequerimientos}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              {subOpenRequerimientos ? <FolderOpenIcon /> : <FolderIcon />}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="caption"
                  sx={{ fontWeight: selectedSub === 'Requerimientos' ? 'bold' : 'normal' }}
                >
                  Requerimientos
                </Typography>
              }
              sx={{ color: 'white' }}
            />
            {subOpenRequerimientos ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
          </ListItemButton>

          <Collapse in={subOpenRequerimientos} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {archivosFiltradosRequerimientos.map((archivo) => (
                <Link to={archivo.archivo} target='__blank' key={archivo.id}>
                  <ListItemButton sx={{ pl: 8 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <PictureAsPdfIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="caption">
                          {archivo.nombre}.pdf
                        </Typography>
                      }
                      sx={{ color: 'white' }}
                    />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>
      </Collapse>
      {/* Segunda Carpeta: Información Recibida */}
      <ListItemButton onClick={handleClick2}>
        <ListItemIcon sx={{ color: 'white' }}>
          {open2 ? <FolderOpenIcon /> : <FolderIcon />}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="caption">Información Recibida</Typography>
          }
          sx={{ color: 'white' }}
        />
        {open2 ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
      </ListItemButton>

      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {imputados.map((imputado, index) => {
            const archivosRelacionados = archivosImputados.filter(
              (archivo) => archivo.imputado === imputado.id
            );
            const tiposDeArchivos = [
              ...new Set(archivosRelacionados.map((archivo) => archivo.tipo)),
            ];

            return (
              <React.Fragment key={imputado.id}>
                <ListItemButton
                  sx={{
                    pl: 4,
                    bgcolor:
                      selectedSub === imputado.nombres + ' ' + imputado.apellidos
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'transparent',
                  }}
                  onClick={() => {
                    toggleImputadoCollapse(index, imputado);
                    onSubSelected(imputado.id);
                  }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    {openImputados[index] ? <FolderOpenIcon /> : <FolderIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="caption">
                        {`${imputado.nombres} ${imputado.apellidos}`}
                      </Typography>
                    }
                    sx={{ color: 'white' }}
                  />
                  {openImputados[index] ? (
                    <ExpandLess sx={{ color: 'white' }} />
                  ) : (
                    <ExpandMore sx={{ color: 'white' }} />
                  )}
                </ListItemButton>
                <Collapse in={openImputados[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {tiposDeArchivos.map((tipo) => {
                      const archivosPorTipo = archivosRelacionados.filter(
                        (archivo) => archivo.tipo === tipo
                      );
                      return (
                        <React.Fragment key={`${imputado.id}-${tipo}`}>
                          <ListItemButton
                            sx={{
                              pl: 6,
                              bgcolor:
                                selectedSub === tipo ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                            }}
                            onClick={() => {
                              setSelectedSub(tipo);
                              onSubSelected(tipo);
                            }}
                          >
                            <ListItemIcon sx={{ color: 'white' }}>
                              <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="caption">
                                  {tipo}
                                </Typography>
                              }
                              sx={{ color: 'white' }}
                            />
                          </ListItemButton>
                          <Collapse in={selectedSub === tipo} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {archivosPorTipo.map((archivo) => (
                                <Link to={archivo.archivo} target="__blank" key={archivo.id}>
                                  <ListItemButton sx={{ pl: 8 }}>
                                    <ListItemIcon sx={{ color: 'white' }}>
                                      <PictureAsPdfIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Typography variant="caption">
                                          {archivo.nombre}.pdf
                                        </Typography>
                                      }
                                      sx={{ color: 'white' }}
                                    />
                                  </ListItemButton>
                                </Link>
                              ))}
                            </List>
                          </Collapse>
                        </React.Fragment>
                      );
                    })}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
