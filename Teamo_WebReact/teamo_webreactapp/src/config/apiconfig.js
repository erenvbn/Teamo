const baseConfig = {
    dev: {
        apiBaseUrl: 'https://localhost:7001/api/',
    },
    prod: {
        apiBaseUrl: 'https://localhost:7002/api/',
    }
}

const devStage = "dev";

const apiBaseUrl = baseConfig[devStage].apiBaseUrl;

const apiConfig = {
    getAssignments: `${apiBaseUrl}Assignment`,
    getProjects: `${apiBaseUrl}Project`,
    getUsers: `${apiBaseUrl}User`,
    getComments: `${apiBaseUrl}Comment`,
}

export default apiConfig;
