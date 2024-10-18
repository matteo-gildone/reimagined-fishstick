const ds = () => {
    const store = {
        components: new Map()
    };

    const registerComponent = (name, config) => {
        const {version, ...rest} = config;
        if(!store.components.has(name)) {
            store.components.set(name, new Map());
        }

        const componentVersion = store.components.get(name);
        componentVersion.set(version, rest);
    };

    const getSpecificVersion = (name, version) => {
        const componentVersion = store.components.get(name);
        if (!componentVersion) {
            throw new Error(`Component version ${name} does not exist`);
        }
        const component = componentVersion.get(version);
        if (!component) {
            throw new Error(`Component version ${version} does not exist`);
        }

        return component;
    };

    return {
        registerComponent,
        getSpecificVersion
    }
};

module.exports = {ds};