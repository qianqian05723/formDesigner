package com.wingconn.govForm.factory;

import com.wingconn.govForm.to.FixationIdComponentTO;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 17:19.
 */
public class FixationIdComponentTOFactory {

    public static FixationIdComponentTO copy (FixationIdComponentTO source) {
        return new FixationIdComponentTO(source.getId(), source.getApiUrl(), source.getApiField(), source.getApiModelId(), source.getFieldId());
    }
}
