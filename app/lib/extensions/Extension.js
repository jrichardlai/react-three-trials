import React     from 'react';
import invariant from 'invariant';
import _         from 'underscore';

const create = ({extensionName, requiredParams = {}, exports = {}, optionalParams, ...BaseLib}) => {
  invariant(
    extensionName,
    'extensionName required when defining an extension'
  );

  const Extension = (Component, params = {}) => {

    const componentName = Component.displayName || Component.name;
    const containerName = `${extensionName} (${componentName})`;

    _.pairs(requiredParams).forEach(([key, text]) => {
      invariant(
        params[key],
        `Extension params required ${containerName} ${key}: ${text}`
      );
    });

    class ComponentContainer extends React.Component {
      displayName: containerName

      constructor(props) {
        super(props);

        this.state = {};

        this.getExtensionProps    = this.getExtensionProps.bind(this);
        this.getExportedVariables = this.getExportedVariables.bind(this);
        this.getExportedMethods   = this.getExportedMethods.bind(this);
        this.getOriginalComponent = this.getOriginalComponent.bind(this);
        this.renderComponent      = this.renderComponent.bind(this);

        Object.assign(this, BaseLib);
      }

      getOriginalComponent() {
        if (this.refs._ExtensionComponent.originalComponent) {
          return this.refs._ExtensionComponent.originalComponent();
        }
        return this.refs._ExtensionComponent;
      }

      // Implement getExtensionProps if you want to add more behavior passed to the Component
      // it will allow accessing in the Extended Component with this.props[ExtensionName]
      getExtensionProps() {
        return {
          [extensionName]: Object.assign({variables: this.getExportedVariables()}, this.getExportedMethods())
        }
      }

      getExportedVariables() {
        var _variables = {};
        (exports.variables || []).forEach((variableName) => _variables[variableName] = this.state[variableName]);

        return _variables;
      }

      getExportedMethods() {
        var _methods = {};
        (exports.methods || []).forEach((methodName) => _methods[methodName] = this[methodName]);

        console.log('exportedMethods', _methods);

        return _methods;
      }

      renderComponent() {
        return (
          <Component
            {...this.props}
            {...this.getExtensionProps()}
            ref="_ExtensionComponent"
          />
        );
      }

      render() {
        if (this.renderExtension) {
          return this.renderExtension();
        }

        return this.renderComponent();
      }

    }

    return ComponentContainer;
  };

  return Extension;
};

module.exports = {create};
