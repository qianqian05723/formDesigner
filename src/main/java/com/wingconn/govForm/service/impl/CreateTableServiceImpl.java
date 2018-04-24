package com.wingconn.govForm.service.impl;

import com.wingconn.govForm.constant.ServerMsgConstants;
import com.wingconn.govForm.dao.CreateTableDAO;
import com.wingconn.govForm.service.CreateTableService;
import com.wingconn.govForm.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-28 10:47.
 */
@Service
public class CreateTableServiceImpl implements CreateTableService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CreateTableServiceImpl.class);

    private final CreateTableDAO createTableDAO;

    @Autowired
    public CreateTableServiceImpl(CreateTableDAO createTableDAO) {
        this.createTableDAO = createTableDAO;
    }

    /**
     * 获取当前数据库的名字
     * @return
     */
//    public String getCurDBName() {
//        return createTableDAO.getCurDBName();
//    }

    /**
     * 判断指定的 table 是否存在 database 中
     * @param databaseName 数据库名
     * @param tableName 表名
     * @return
     */
//    public String isTargetTableExistInDB(String databaseName, String tableName) {
//        return createTableDAO.isTargetTableExistInDB(tableName);
//    }

    /**
     * 获取指定表中记录的条数
     * @param tableName
     * @return
     */
//    public int getRecordCount(String tableName) {
//        return createTableDAO.getRecordCount(tableName);
//    }

    /**
     * 创建一个新表
     * @param tableName
     * @param tableColumns
     * @return
     */
    @Override
    public boolean createTable(String tableName, List<String> tableColumns) {
        if (StringUtils.isNullOrEmpty(createTableDAO.isTargetTableExistInDB(tableName))) {
            StringBuilder builder = new StringBuilder("id int auto_increment,form_instance_id varchar(64),");
            for (String column : tableColumns) {
                column = org.apache.commons.lang3.StringUtils.trim(column);
                builder.append(column).append(" varchar(255),");
            }
            builder.append("primary key(id), foreign key (form_instance_id) references t_form_instance (form_instance_id)");
            LOGGER.debug("sql: " + builder.toString());
            createTableDAO.createNewTable(tableName, builder.toString());
            return true;
        }

        try {
            return addFields(tableName, tableColumns);
        } catch (Exception e) {
            LOGGER.error(ServerMsgConstants.ADD_TABLE_COLUMNS_EXCEPTION + tableName, e);
        }
        return false;
    }

    /**
     * 查看指定表的全部字段
     * @param tableName
     * @return
     */
//    public List<String> showFields(String tableName) {
//        return createTableDAO.showFields(tableName);
//    }

    /**
     * 查看指定表的全部字段
     * @param tableName
     * @return
     */
//    public List<TableFields> showTableFields(String tableName) {
//        return createTableDAO.showTableFields(tableName);
//    }

    /**
     * 向指定表中添加字段
     * @param tableName
     * @param fields
     * @return
     */
    private boolean addFields(String tableName, List<String> fields) {
        List<String> existFields = createTableDAO.showFields(tableName);
        List<String> duplicateFields = new ArrayList<>();
        for (String out : fields) {
            for (String in : existFields) {
                if (org.apache.commons.lang3.StringUtils.equals(in, out)) {
                    duplicateFields.add(in);
                    break;
                }
            }
        }
        fields.removeAll(duplicateFields);
        if (0 != fields.size()) {
            createTableDAO.addFields(tableName, fields);
        }
        return true;
    }
}
