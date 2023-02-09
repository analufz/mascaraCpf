/**
* @NApiVersion  2.x
* @NScriptType  ClientScript
* @NModuleScope SameAccount
* Autor:        Ana Luiza Fiuza
*/
define(['N/log', 'require', 'exports'],

/**
* @param {log} log
*/

function(log, require, exports) {
    
    /**
    * Function to be executed when field is changed.
    * @param {Object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @param {string} scriptContext.sublistId     - Sublist name
    * @param {string} scriptContext.fieldId       - Field name
    * @param {number} scriptContext.lineNum       - Line number. Will be undefined if not a sublist or matrix field
    * @param {number} scriptContext.columnNum     - Line number. Will be undefined if not a matrix field
    * @since 2015.2
    */

    function fieldChanged(scriptContext) {
        var employee = scriptContext.currentRecord;

        if (scriptContext.fieldId == 'socialsecuritynumber') { // Campo CPF RH
            var cpf_infofiscal = employee.getValue('custentity_enl_cnpjcpf');
            var pega_cpf_transformar = exports.mascaraCpf(cpf_infofiscal);
            employee.setValue('custentity_enl_cnpjcpf', pega_cpf_transformar);
        }
    }

    function mascaraCpf (cpf_infofiscal) {
        var transforma_cpf_numeros = cpf_infofiscal.replace(/\D/g, "");
        if (transforma_cpf_numeros.length > 10) {
            return transforma_cpf_numeros.slice(0, 11)
            .replace(/(\d{3})(\d)/,"$1.$2")
            .replace(/(\d{3})(\d)/,"$1.$2")
            .replace(/(\d{3})(\d{1,2})$/,"$1-$2");  
        }
        return transforma_cpf_numeros.replace(/\D/g, "")
    };

    exports.mascaraCpf = mascaraCpf

    return {
           fieldChanged: fieldChanged,
    };
    
});
