package com.wingconn.govForm.factory;


import com.wingconn.govForm.to.ColumnInfoTO;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 14:44.
 */
public final class ColumnInfoTOFactory {

    public static ColumnInfoTO newInstance(String id, String describe) {
        ColumnInfoTO columnInfoTO = new ColumnInfoTO();
        columnInfoTO.setId(id);
        columnInfoTO.setDescribe(describe);
        return columnInfoTO;
    }
}
