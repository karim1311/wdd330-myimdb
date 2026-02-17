import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import MediaDetails from "./MediaDetails.mjs";

loadHeaderFooter()

const id = getParam("id");
const type = getParam("type");

const dataSource = new ExternalServices();

const mediaDetails = new MediaDetails(id, type, dataSource);

mediaDetails.init();