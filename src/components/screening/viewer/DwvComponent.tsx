import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles, useTheme } from '@mui/styles';
// import Typography from '@mui/material/Typography';

// import Stack from '@mui/material/Stack';
// import LinearProgress from '@mui/material/LinearProgress';

// import Link from '@mui/material/Link';
// import IconButton from '@mui/material/IconButton';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// https://mui.com/material-ui/material-icons/
// import CloseIcon from '@mui/icons-material/Close';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import MenuIcon from '@mui/icons-material/Menu';
// import ContrastIcon from '@mui/icons-material/Contrast';
// import SearchIcon from '@mui/icons-material/Search';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import StraightenIcon from '@mui/icons-material/Straighten';
// import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
// import Dialog from '@mui/material/Dialog';
// import AppBar from '@mui/material/AppBar';
// import Slide from '@mui/material/Slide';
// import Toolbar from '@mui/material/Toolbar';

// import TagsTable from './TagsTable';

import { Row } from 'antd';
import {
  App, decoderScripts, getDwvVersion
} from 'dwv';
import { processEnv } from '../../../processEnv';
import Progress from '../../../userControls/components/progress';
import Slider from '../../../userControls/components/slider';
import classnames from './DwvComponent.module.scss';

// Image decoders (for web workers)
decoderScripts.jpeg2000 = `${processEnv().publicUrl}/assets/dwv/decoders/pdfjs/decode-jpeg2000.js`;
decoderScripts["jpeg-lossless"] = `${processEnv().publicUrl}/assets/dwv/decoders/rii-mango/decode-jpegloss.js`;
decoderScripts["jpeg-baseline"] = `${processEnv().publicUrl}/assets/dwv/decoders/pdfjs/decode-jpegbaseline.js`;
decoderScripts.rle = `${processEnv().publicUrl}/assets/dwv/decoders/dwv/decode-rle.js`;

// const styles = theme => ({
//   appBar: {
//     position: 'relative',
//   },
//   title: {
//     flex: '0 0 auto',
//   },
//   iconSmall: {
//     fontSize: 20,
//   }
// });

export const TransitionUp = React.forwardRef<any>((props, ref) => (
  <Slider vertical {...props} ref={ref} />
))

type propType = {
  // classes: string,
  dcmUri: string
}
type stateType = {
  versions: {
    dwv: string,
    react: string
  },
  tools: {
    Scroll: any,
    ZoomAndPan: any,
    WindowLevel: any,
    Draw: {
      options: string[]
    }
  },
  selectedTool: string,
  loadProgress: number,
  dataLoaded: boolean,
  dwvApp: App | null,
  metaData: any,
  orientation: string | undefined,
  showDicomTags: boolean
}

class DwvComponent extends React.Component<propType, stateType> {

  constructor(props: propType) {
    super(props);
    this.state = {
      versions: {
        dwv: getDwvVersion(),
        react: React.version
      },
      tools: {
        Scroll: {},
        ZoomAndPan: {},
        WindowLevel: {},
        Draw: {
          options: ['Ruler']
        }
      },
      selectedTool: 'Select Tool',
      loadProgress: 0,
      dataLoaded: false,
      dwvApp: null,
      metaData: {},
      orientation: undefined,
      showDicomTags: false
    };
  }

  render() {
    // const { classes } = this.props;
    const { versions, tools, loadProgress, dataLoaded, metaData } = this.state;

    // const handleToolChange = (event, newTool) => {
    //   if (newTool) {
    //     this.onChangeTool(newTool);
    //   }
    // };
    // const toolsButtons = Object.keys(tools).map((tool) => {
    //   return (
    //     <ToggleButton value={tool} key={tool} title={tool}
    //       disabled={!dataLoaded || !this.canRunTool(tool)}>
    //       {this.getToolIcon(tool)}
    //     </ToggleButton>
    //   );
    // });

    return (
      <div id="dwv" className={classnames.dwv}>
        <Row justify={"center"} className={classnames.progressRow}>
          {loadProgress > 0 && <Progress percent={loadProgress} />}
        </Row>
        <Row justify={"center"} className={classnames.toolbarRow}>
          {/* <ToggleButtonGroup size="small"
            color="primary"
            value={this.state.selectedTool}
            exclusive
            onChange={handleToolChange}
          >
            {toolsButtons}
          </ToggleButtonGroup>

          <ToggleButton size="small"
            value="reset"
            title="Reset"
            disabled={!dataLoaded}
            onChange={this.onReset}
          ><RefreshIcon /></ToggleButton>

          <ToggleButton size="small"
            value="toggleOrientation"
            title="Toggle Orientation"
            disabled={!dataLoaded}
            onClick={this.toggleOrientation}
          ><CameraswitchIcon /></ToggleButton> */}

          {/* <ToggleButton size="small"
            value="tags"
            title="Tags"
            disabled={!dataLoaded}
            onClick={this.handleTagsDialogOpen}
          ><LibraryBooksIcon /></ToggleButton> */}

          {/* <Dialog
            open={this.state.showDicomTags}
            onClose={this.handleTagsDialogClose}
            TransitionComponent={TransitionUp}
          >
            <AppBar className={classes.appBar} position="sticky">
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleTagsDialogClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.flex}>
                  DICOM Tags
                </Typography>
              </Toolbar>
            </AppBar>
            <TagsTable data={metaData} />
          </Dialog> */}
        </Row>
        <div id="layerGroup0" className={classnames.layerGroup} />
      </div>
    );
  }

  componentDidUpdate(prevProps: propType, prevState: stateType): void {
    if (prevProps.dcmUri !== this.props.dcmUri) {
      this.unloadApp();
      const app = this.initApp();
      this.loadUri(app, this.props.dcmUri)
    }

  }

  unloadApp = () => {
    if (this.state.dwvApp) {
      const app = this.state.dwvApp;
      app.reset();
    }
  }

  initApp = () => {
    const app = new App();
    // initialise app
    app.init({
      "dataViewConfigs": { '*': [{ divId: 'layerGroup0' }] },
      "tools": this.state.tools
    });

    // load events
    let nLoadItem = 0;
    let nReceivedLoadError = false;
    let isFirstRender = false;

    app.addEventListener('loadstart', (/*event*/) => {
      console.info('app loadstart')
      // reset flags
      nLoadItem = 0;
      nReceivedLoadError = false;

      isFirstRender = true;
    });
    app.addEventListener("loadprogress", (event: any) => {
      this.setState({ loadProgress: event.loaded });
    });
    app.addEventListener('renderend', (/*event*/) => {
      if (isFirstRender) {
        isFirstRender = false;
        // available tools
        let selectedTool = 'ZoomAndPan';
        if (app.canScroll()) {
          selectedTool = 'Scroll';
        }
        this.onChangeTool(selectedTool);
      }
    });
    app.addEventListener("load", (/*event*/) => {
      console.info('app load')
      // set dicom tags
      this.setState({ metaData: app.getMetaData(0) });
      // set data loaded flag
      this.setState({ dataLoaded: true });
    });
    app.addEventListener('loadend', (/*event*/) => {
      if (nReceivedLoadError) {
        this.setState({ loadProgress: 0 });
        alert('Received errors during load. Check log for details.');
        // show drop box if nothing has been loaded
      }
      this.setState({ loadProgress: 0 });
    });
    app.addEventListener('loaditem', (/*event*/) => {
      ++nLoadItem;
    });
    app.addEventListener('loaderror', (event: any) => {
      console.error(event.error);
      nReceivedLoadError = true;
    });
    // app.addEventListener('loadabort', (/*event*/) => {
    //   ++nReceivedLoadAbort;
    // });

    // handle key events
    app.addEventListener('keydown', (event: KeyboardEvent) => {
      app.defaultOnKeydown(event);
    });
    // handle window resize
    window.addEventListener('resize', app.onResize);

    // store
    this.setState({ dwvApp: app });
    return app;
  }

  loadUri = (app: App, uri: string) => {

    if (app) {
      app.loadURLs([this.props.dcmUri]);
    } else {
      console.error('!app')
    }
  }



  componentDidMount() {

    // create app

    const app = this.initApp();
    this.loadUri(app, this.props.dcmUri);


  }

  /**
   * Get the icon of a tool.
   *
   * @param {string} tool The tool name.
   * @returns {Icon} The associated icon.
   */
  // getToolIcon = (tool) => {
  //   let res;
  //   if (tool === 'Scroll') {
  //     res = (<MenuIcon />);
  //   } else if (tool === 'ZoomAndPan') {
  //     res = (<SearchIcon />);
  //   } else if (tool === 'WindowLevel') {
  //     res = (<ContrastIcon />);
  //   } else if (tool === 'Draw') {
  //     res = (<StraightenIcon />);
  //   }
  //   return res;
  // }

  /**
   * Handle a change tool event.
   * @param {string} tool The new tool name.
   */
  onChangeTool = (tool: any) => {
    if (this.state.dwvApp) {
      this.setState({ selectedTool: tool });
      this.state.dwvApp.setTool(tool);
      // if (tool === 'Draw') {
      //   this.onChangeShape(this.state.tools.Draw.options[0]);
      // }
    }
  }

  /**
   * Check if a tool can be run.
   *
   * @param {string} tool The tool name.
   * @returns {boolean} True if the tool can be run.
  //  */
  // canRunTool = (tool) => {
  //   let res;
  //   if (tool === 'Scroll') {
  //     res = this.state.dwvApp.canScroll();
  //   } else if (tool === 'WindowLevel') {
  //     res = this.state.dwvApp.canWindowLevel();
  //   } else {
  //     res = true;
  //   }
  //   return res;
  // }

  /**
   * Toogle the viewer orientation.
   */
  // toggleOrientation = () => {
  //   if (typeof this.state.orientation !== 'undefined') {
  //     if (this.state.orientation === 'axial') {
  //       this.state.orientation = 'coronal';
  //     } else if (this.state.orientation === 'coronal') {
  //       this.state.orientation = 'sagittal';
  //     } else if (this.state.orientation === 'sagittal') {
  //       this.state.orientation = 'axial';
  //     }
  //   } else {
  //     // default is most probably axial
  //     this.state.orientation = 'coronal';
  //   }
  //   // update data view config
  //   const config = {
  //     '*': [
  //       {
  //         divId: 'layerGroup0',
  //         orientation: this.state.orientation
  //       }
  //     ]
  //   };
  //   this.state.dwvApp.setDataViewConfig(config);
  //   // render data
  //   for (let i = 0; i < this.state.dwvApp.getNumberOfLoadedData(); ++i) {
  //     this.state.dwvApp.render(i);
  //   }
  // }

  /**
   * Handle a change draw shape event.
   * @param {string} shape The new shape name.
   */
  // onChangeShape = (shape) => {
  //   if (this.state.dwvApp) {
  //     this.state.dwvApp.setToolFeatures({ shapeName: shape });
  //   }
  // }

  /**
   * Handle a reset event.
   */
  onReset = () => {
    if (this.state.dwvApp) {
      this.state.dwvApp.resetDisplay();
    }
  }

  /**
   * Open the DICOM tags dialog.
   */
  handleTagsDialogOpen = () => {
    this.setState({ showDicomTags: true });
  }

  /**
   * Close the DICOM tags dialog.
   */
  handleTagsDialogClose = () => {
    this.setState({ showDicomTags: false });
  };



} // DwvComponent


export default DwvComponent;
